import { Stack, Typography } from '@mui/material'
import { Diagnosis, Patient } from '../../types'
import EntryDetails from './EntryDetails'

const EntryList = ({
  diagnoses,
  patient
}: {
  diagnoses: Diagnosis[]
  patient: Patient
}) => {
  return (
    <>
      <Typography variant='h6' style={{ marginTop: '1em' }} gutterBottom>
        {patient.entries.length > 0 ? 'Entries' : 'No entries'}
      </Typography>
      {patient.entries.length > 0 ? (
        <Stack direction='column' spacing={2}>
          {patient.entries.map((entry, index) => (
            <EntryDetails diagnoses={diagnoses} key={index} entry={entry} />
          ))}
        </Stack>
      ) : null}
    </>
  )
}

export default EntryList
