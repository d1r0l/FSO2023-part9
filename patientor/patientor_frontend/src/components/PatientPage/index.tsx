import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import patientService from '../../services/patients'
import { Patient } from '../../types'
import { useParams } from 'react-router-dom'

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

  const genderSymbol = (gender: string) => {
    switch (gender) {
      case 'male':
        return <>&#9794;</>
      case 'female':
        return <>&#9792;</>
      default:
        return <>&#9895;</>
    }
  }

  if (!patient) return <div />
  else {
    return (
      <div>
        <Typography variant='h4' style={{ marginTop: '0.5em' }} gutterBottom>
          {patient.name}{' '}
          <span style={{ fontFamily: 'Segoe UI Emoji' }}>
            {genderSymbol(patient.gender)}
          </span>
        </Typography>
        <Typography variant='h5'>
          {'SSN: '}
          {patient.ssn}
        </Typography>
        <Typography variant='h5'>
          {'Date of birth: '}
          {patient.dateOfBirth}
        </Typography>
        <Typography variant='h5'>
          {'Occupation: '}
          {patient.occupation}
        </Typography>
      </div>
    )
  }
}

export default PatientPage
