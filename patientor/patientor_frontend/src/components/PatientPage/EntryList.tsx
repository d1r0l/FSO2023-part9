import { Stack, Typography } from '@mui/material'
import { Patient } from '../../types'
import EntryDetails from './EntryDetails'

const EntryList = ({ patient }: { patient: Patient }) => {
  return (
    <>
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
    </>
  )
}

export default EntryList
