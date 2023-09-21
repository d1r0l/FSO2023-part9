import { Typography } from '@mui/material'
import { Diagnosis, Entry } from '../../types'
import { useState, useEffect } from 'react'
import diagnosesService from '../../services/diagnoses'

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

  useEffect(() => {
    void diagnosesService.getAll().then(diagnoses => setDiagnoses(diagnoses))
  }, [entry])

  return (
    <div>
      <Typography variant='body1' gutterBottom>
        {entry.date} {entry.description}
      </Typography>
      <ul>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map(diagnosisCode => (
            <li>
              <Typography variant='body1' key={diagnosisCode}>
                {diagnosisCode}{' '}
                {diagnoses.find(d => d.code === diagnosisCode)?.name}
              </Typography>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default EntryDetails
