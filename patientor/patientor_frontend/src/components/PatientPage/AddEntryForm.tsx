import { useState } from 'react'
import { Diagnosis, Patient } from '../../types'
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Collapse,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import patientService from '../../services/patients'
import { AxiosError } from 'axios'
import { DatePicker } from '@mui/x-date-pickers'

const StyledTextField = ({
  required,
  label,
  value,
  setValue
}: {
  required: boolean
  label: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}): React.JSX.Element => {
  return (
    <TextField
      required={required}
      label={label}
      variant='standard'
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  )
}

const StyledDatePicker = ({
  required,
  label,
  value,
  setValue
}: {
  required: boolean
  label: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}): React.JSX.Element => {
  return (
    <>
      <DatePicker
        slotProps={{
          textField: {
            variant: 'standard',
            required: required,
            label: label,
            error: false
          }
        }}
        value={value}
        onChange={newValue => (newValue ? setValue(newValue) : null)}
      />
    </>
  )
}

const StyledAutocomplete = ({
  label,
  options,
  value,
  setValue
}: {
  label: string
  options: string[]
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <Autocomplete
      disablePortal
      options={options}
      value={value}
      onChange={(_, value: string) => setValue(value)}
      renderInput={params => (
        <TextField {...params} label={label} variant='standard' />
      )}
      disableClearable
    />
  )
}

const StyledSwitch = ({
  label,
  value,
  setValue
}: {
  label: string
  value: boolean
  setValue: React.Dispatch<React.SetStateAction<boolean>>
}): React.JSX.Element => {
  return (
    <FormControlLabel
      control={
        <Switch checked={value} onChange={e => setValue(e.target.checked)} />
      }
      label={label}
    />
  )
}

const AddEntryForm = ({
  patient,
  setPatient,
  diagnoses
}: {
  patient: Patient
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>
  diagnoses: Diagnosis[]
}): React.JSX.Element => {
  // Base entry values
  const entryTypes = ['HealthCheck', 'OccupationalHealthcare', 'Hospital']
  const [type, setType] = useState<string>('HealthCheck')
  const [description, setDescription] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [specialist, setSpecialist] = useState<string>('')
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])

  // HealthCheck entry values
  const [healthCheckRating, setHealthCheckRating] = useState<string>('Healthy')
  const healthCheckRatingTypes = [
    'Healthy',
    'Low risk',
    'High risk',
    'Critical risk'
  ]

  // OccupationalHealthcare entry values
  const [employerName, setEmployerName] = useState<string>('')
  const [sickLeave, setSickLeave] = useState<boolean>(false)
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>('')
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>('')

  // Hospital entry values
  const [dischargeDate, setDischargeDate] = useState<string>('')
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('')

  // Alert values
  const [timer, setTimer] = useState<NodeJS.Timeout>()
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [alertText, setAlertText] = useState<string>('')
  const [alertSeverity, setAlertSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success')

  const createAlert = (
    text: string,
    severity: 'success' | 'info' | 'warning' | 'error'
  ): void => {
    clearTimeout(timer)
    setAlertText(text)
    setAlertSeverity(severity)
    setShowAlert(true)
    setTimer(setTimeout(() => setShowAlert(false), 5000))
  }

  const handleAlertClose = (): void => {
    setShowAlert(false)
    clearTimeout(timer)
  }

  const clearFields = (): void => {
    setDescription('')
    setDate('')
    setSpecialist('')
    setDiagnosisCodes([])
    setHealthCheckRating('Healthy')
    setEmployerName('')
    setSickLeave(false)
    setSickLeaveStartDate('')
    setSickLeaveEndDate('')
    setDischargeDate('')
    setDischargeCriteria('')
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    const createEntry = () => {
      const baseValues = {
        type,
        description,
        date,
        specialist,
        diagnosisCodes
      }
      switch (type) {
        case 'HealthCheck':
          return {
            ...baseValues,
            healthCheckRating
          }
        case 'OccupationalHealthcare':
          if (sickLeave)
            return {
              ...baseValues,
              employerName,
              sickLeave: {
                startDate: sickLeaveStartDate,
                endDate: sickLeaveEndDate
              }
            }
          else
            return {
              ...baseValues,
              employerName
            }
        case 'Hospital':
          return {
            ...baseValues,
            discharge: {
              date: dischargeDate,
              criteria: dischargeCriteria
            }
          }
      }
    }

    try {
      const addedEntry = await patientService.createEntry(
        patient.id,
        createEntry()
      )
      const updatedPatient = {
        ...patient,
        entries: patient.entries.concat(addedEntry)
      }
      setPatient(updatedPatient)
      createAlert(`Entry successfully added!`, 'success')
      clearFields()
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data?.error) {
        createAlert(error.response.data.error, 'error')
        console.error(error.response.data.error)
      } else console.error(error)
    }
  }

  const handleReset = (e: React.FormEvent): void => {
    e.preventDefault()
    clearFields()
  }

  return (
    <>
      <Collapse in={showAlert}>
        <Alert onClose={() => handleAlertClose()} severity={alertSeverity}>
          {alertText}
        </Alert>
      </Collapse>
      <Stack
        component='form'
        onSubmit={handleSubmit}
        onReset={handleReset}
        spacing={1}
        sx={{
          my: 2,
          p: 2,
          border: '2px dotted grey',
          borderRadius: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography variant='h6' gutterBottom>
          New entry:
        </Typography>
        <StyledAutocomplete
          label='Entry type'
          options={entryTypes}
          value={type}
          setValue={setType}
        />
        <StyledTextField
          required
          label='Description'
          value={description}
          setValue={setDescription}
        />
        <StyledDatePicker
          required
          label='Date'
          value={date}
          setValue={setDate}
        />
        <StyledTextField
          required
          label='Specialist'
          value={specialist}
          setValue={setSpecialist}
        />
        <FormControl sx={{ maxWidth: '100%' }}>
          <InputLabel id='diagnosis-codes-label' variant='standard'>
            Diagnosis codes
          </InputLabel>
          <Select
            labelId='diagnosis-codes-label'
            variant='standard'
            multiple
            value={diagnosisCodes}
            onChange={e => {
              typeof e.target.value === 'string'
                ? setDiagnosisCodes(e.target.value.split(','))
                : setDiagnosisCodes(e.target.value)
            }}
          >
            {diagnoses.map(diagnosis => (
              <MenuItem
                key={diagnoses.indexOf(diagnosis)}
                value={diagnosis.code}
              >
                {diagnosis.code + ' ' + diagnosis.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {type === 'HealthCheck' && (
          <>
            <StyledAutocomplete
              label='Healthcheck Rating'
              options={healthCheckRatingTypes}
              value={healthCheckRating}
              setValue={setHealthCheckRating}
            />
          </>
        )}
        {type === 'OccupationalHealthcare' && (
          <>
            <StyledTextField
              required
              label='Employer name'
              value={employerName}
              setValue={setEmployerName}
            />
            <StyledSwitch
              label='Sick leave'
              value={sickLeave}
              setValue={setSickLeave}
            />
            {sickLeave && (
              <>
                <StyledDatePicker
                  required={sickLeave}
                  label='Sick leave start date'
                  value={sickLeaveStartDate}
                  setValue={setSickLeaveStartDate}
                />
                <StyledDatePicker
                  required={sickLeave}
                  label='Sick leave end date'
                  value={sickLeaveEndDate}
                  setValue={setSickLeaveEndDate}
                />
              </>
            )}
          </>
        )}
        {type === 'Hospital' && (
          <>
            <StyledDatePicker
              required
              label='Discharge date'
              value={dischargeDate}
              setValue={setDischargeDate}
            />
            <StyledTextField
              required
              label='Discharge criteria'
              value={dischargeCriteria}
              setValue={setDischargeCriteria}
            />
          </>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant='contained' type='reset' color='error'>
            Reset
          </Button>
          <Button variant='contained' type='submit' color='inherit'>
            Submit
          </Button>
        </Box>
      </Stack>
    </>
  )
}

export default AddEntryForm
