import { Typography } from '@mui/material'
import GenderIcon from './GenderIcon'
import { Patient } from '../../types'

const PatientInfo = ({ patient }: { patient: Patient }) => {
  return (
    <>
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
    </>
  )
}

export default PatientInfo
