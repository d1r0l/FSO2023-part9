import { useState } from 'react'
import { Patient } from '../../types'
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material'
import patientService from '../../services/patients'

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
  const [healthCheckRating, setHealthCheckRating] = useState<string>('Healthy')
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>('')
  const entryTypes = ['HealthCheck']
  const healthCheckRatingTypes = [
    'Healthy',
    'Low risk',
    'High risk',
    'Critical risk'
  ]

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
      clearFields()
    } catch (e: unknown) {
      console.error(e)
    }
  }

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault()
    clearFields()
  }

  return (
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
        variant='standard'
        sx={{ my: 1 }}
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <TextField
        label='Date'
        variant='standard'
        sx={{ my: 1 }}
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <TextField
        label='Specialist'
        variant='standard'
        sx={{ my: 1 }}
        value={specialist}
        onChange={e => setSpecialist(e.target.value)}
      />
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
      <TextField
        label='Diagnosis Codes'
        variant='standard'
        sx={{ my: 1 }}
        value={diagnosisCodes}
        onChange={e => setDiagnosisCodes(e.target.value)}
      />
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant='contained' type='reset' color='error'>
          Reset
        </Button>
        <Button variant='contained' type='submit' color='inherit'>
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default AddEntryForm
