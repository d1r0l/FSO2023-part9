import { Paper, Typography } from '@mui/material'
import { Diagnosis, Entry } from '../../types'
import { useState, useEffect } from 'react'
import diagnosesService from '../../services/diagnoses'
import EntryIcon from './EntryIcon'
import HealthCheckRatingIcon from './HealthCheckRatingIcon'

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

  useEffect(() => {
    void diagnosesService.getAll().then(diagnoses => setDiagnoses(diagnoses))
  }, [entry])

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
            <li>
              <Typography variant='body1' key={diagnosisCode}>
                {diagnosisCode}{' '}
                {diagnoses.find(d => d.code === diagnosisCode)?.name}
              </Typography>
            </li>
          ))}
        </ul>
      )}
      <Typography variant='body1'>
        {'Diagnosed by: '}
        {entry.specialist}
      </Typography>
    </Paper>
  )
}

export default EntryDetails
