import { Typography } from '@mui/material'
import { Entry } from '../../types'

const EntryDetails = ({ entry }: { entry: Entry }) => {
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
                {diagnosisCode}
              </Typography>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default EntryDetails
