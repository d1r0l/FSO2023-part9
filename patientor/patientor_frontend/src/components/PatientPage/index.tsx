import { useState, useEffect } from 'react'
import { Stack, Typography } from '@mui/material'
import patientService from '../../services/patients'
import { Patient } from '../../types'
import { useParams } from 'react-router-dom'
import EntryDetails from './EntryDetails'
import GenderIcon from './GenderIcon'

const PatientPage = (): React.JSX.Element => {
  const [patient, setPatient] = useState<Patient>()
  let { patientId } = useParams()

  useEffect(() => {
    if (patientId) {
      void patientService
        .getById(patientId)
        .then(patient => setPatient(patient))
    }
  }, [patientId])

  if (!patient) return <div />
  else {
    return (
      <div>
        <Typography variant='h4' style={{ marginTop: '1em' }} gutterBottom>
          {patient.name} <GenderIcon gender={patient.gender} />
        </Typography>
        <Typography variant='body1'>
          {'SSN: '}
          {patient.ssn}
        </Typography>
        <Typography variant='body1'>
          {'Date of birth: '}
          {patient.dateOfBirth}
        </Typography>
        <Typography variant='body1'>
          {'Occupation: '}
          {patient.occupation}
        </Typography>
        <Typography variant='h6' style={{ marginTop: '1em' }} gutterBottom>
          {patient.entries.length > 0 ? 'Entries' : 'No entries'}
        </Typography>
        {patient.entries.length > 0 ? (
          <Stack direction='column' spacing={2}>
            {patient.entries.map((entry, index) => (
              <EntryDetails key={index} entry={entry} />
            ))}
          </Stack>
        ) : null}
      </div>
    )
  }
}

export default PatientPage
