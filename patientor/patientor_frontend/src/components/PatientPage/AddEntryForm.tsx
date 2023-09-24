import { useState } from 'react'
import { Patient } from '../../types'
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Collapse,
  FormControlLabel,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import patientService from '../../services/patients'
import { AxiosError } from 'axios'

const AddEntryForm = ({
  patient,
  setPatient
}: {
  patient: Patient
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>
}) => {
  const [type, setType] = useState<string>('HealthCheck')
  const [description, setDescription] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [specialist, setSpecialist] = useState<string>('')
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>('')

  const [healthCheckRating, setHealthCheckRating] = useState<string>('Healthy')
  const [employerName, setEmployerName] = useState<string>('')
  const [sickLeave, setSickLeave] = useState<boolean>(false)
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>('')
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>('')

  const [timer, setTimer] = useState<NodeJS.Timeout>()
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [alertText, setAlertText] = useState<string>('')
  const [alertSeverity, setAlertSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success')

  const entryTypes = ['HealthCheck', 'OccupationalHealthcare', 'Hospital']
  const healthCheckRatingTypes = [
    'Healthy',
    'Low risk',
    'High risk',
    'Critical risk'
  ]

  const createAlert = (
    text: string,
    severity: 'success' | 'info' | 'warning' | 'error'
  ) => {
    clearTimeout(timer)
    setAlertText(text)
    setAlertSeverity(severity)
    setShowAlert(true)
    setTimer(setTimeout(() => setShowAlert(false), 5000))
  }

  const handleAlertClose = () => {
    setShowAlert(false)
    clearTimeout(timer)
  }

  const clearFields = () => {
    setType('HealthCheck')
    setDescription('')
    setDate('')
    setSpecialist('')
    setHealthCheckRating('Healthy')
    setDiagnosisCodes('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newEntry = {
      type,
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes
    }
    try {
      const addedEntry = await patientService.createEntry(patient.id, newEntry)
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

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault()
    clearFields()
  }

  const BaseFields = (): React.JSX.Element => {
    return (
      <>
        <Typography variant='h6' gutterBottom>
          New entry:
        </Typography>
        <Autocomplete
          disablePortal
          options={entryTypes}
          value={type}
          onChange={(_, value: string) => setType(value)}
          renderInput={params => (
            <TextField {...params} label={'Entry type'} variant='standard' />
          )}
          disableClearable
        />
        <TextField
          label='Description'
          required
          variant='standard'
          sx={{ my: 1 }}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <TextField
          label='Date'
          required
          variant='standard'
          sx={{ my: 1 }}
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <TextField
          label='Specialist'
          required
          variant='standard'
          sx={{ my: 1 }}
          value={specialist}
          onChange={e => setSpecialist(e.target.value)}
        />
        <TextField
          label='Diagnosis Codes'
          variant='standard'
          sx={{ my: 1 }}
          value={diagnosisCodes}
          onChange={e => setDiagnosisCodes(e.target.value)}
        />
      </>
    )
  }

  const OptionalFields = (): React.JSX.Element => {
    switch (type) {
      case 'HealthCheck':
        return (
          <>
            <Autocomplete
              disablePortal
              options={healthCheckRatingTypes}
              sx={{ my: 1 }}
              value={healthCheckRating}
              onChange={(_, value: string) => setHealthCheckRating(value)}
              renderInput={params => (
                <TextField
                  {...params}
                  label={'Healthcheck Rating'}
                  variant='standard'
                />
              )}
              disableClearable
            />
          </>
        )
      case 'OccupationalHealthcare':
        return (
          <>
            <TextField
              label='Employer name'
              required
              variant='standard'
              sx={{ my: 1 }}
              value={employerName}
              onChange={e => setEmployerName(e.target.value)}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={sickLeave}
                  onChange={e => setSickLeave(e.target.checked)}
                />
              }
              label='Add sick leave'
            />
            {sickLeave && (
              <>
                <TextField
                  label='Sick leave start date'
                  required={sickLeave}
                  variant='standard'
                  sx={{ my: 1 }}
                  value={sickLeaveStartDate}
                  onChange={e => setSickLeaveStartDate(e.target.value)}
                />
                <TextField
                  label='Sick leave end date'
                  required={sickLeave}
                  variant='standard'
                  sx={{ my: 1 }}
                  value={sickLeaveEndDate}
                  onChange={e => setSickLeaveEndDate(e.target.value)}
                />
              </>
            )}
          </>
        )
      case 'Hospital':
        return (
          <>
            <p>something</p>
          </>
        )
      default:
        return <div />
    }
  }

  return (
    <>
      <Collapse in={showAlert}>
        <Alert
          onClose={() => handleAlertClose()}
          sx={{ mt: 2 }}
          severity={alertSeverity}
        >
          {alertText}
        </Alert>
      </Collapse>
      <Box
        component='form'
        onSubmit={handleSubmit}
        onReset={handleReset}
        sx={{
          my: 2,
          p: 2,
          border: '2px dotted grey',
          borderRadius: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <BaseFields />
        <OptionalFields />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant='contained' type='reset' color='error'>
            Reset
          </Button>
          <Button variant='contained' type='submit' color='inherit'>
            Submit
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default AddEntryForm