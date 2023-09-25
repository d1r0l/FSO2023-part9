import { Paper, Typography } from '@mui/material'
import { Diagnosis, Entry } from '../../types'
import EntryIcon from './EntryIcon'
import HealthCheckRatingIcon from './HealthCheckRatingIcon'

const EntryDetails = ({
  diagnoses,
  entry
}: {
  diagnoses: Diagnosis[]
  entry: Entry
}) => {
  return (
    <Paper variant='outlined' sx={{ p: 2, border: 2 }}>
      <Typography variant='body1'>
        {entry.date + ' '}
        <EntryIcon type={entry.type} />
        {'employerName' in entry && ' ' + entry.employerName}
      </Typography>
      <Typography variant='body1'>
        {'healthCheckRating' in entry && (
          <HealthCheckRatingIcon healthCheckRating={entry.healthCheckRating} />
        )}
        {' ' + entry.description}
      </Typography>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map(diagnosisCode => (
            <li key={diagnosisCode}>
              <Typography variant='body1'>
                {diagnosisCode}{' '}
                {diagnoses.find(d => d.code === diagnosisCode)?.name}
              </Typography>
            </li>
          ))}
        </ul>
      )}
      {'sickLeave' in entry && entry.sickLeave && (
        <Typography variant='body1'>
          {'Sick leave: '}
          {entry.sickLeave.startDate}
          {' - '}
          {entry.sickLeave.endDate}
        </Typography>
      )}
      {'discharge' in entry && entry.discharge && (
        <Typography variant='body1'>
          {'Discharge date: '}
          {entry.discharge.date}
          {', criteria: '}
          {entry.discharge.criteria}
        </Typography>
      )}
      <Typography variant='body1'>
        {'Diagnosed by: '}
        {entry.specialist}
      </Typography>
    </Paper>
  )
}

export default EntryDetails
