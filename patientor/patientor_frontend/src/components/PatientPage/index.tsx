import { useState, useEffect } from 'react'
import patientService from '../../services/patients'
import { Patient } from '../../types'
import { useParams } from 'react-router-dom'
import EntryList from './EntryList'
import PatientInfo from './PatientInfo'

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
        <PatientInfo patient={patient} />
        <EntryList patient={patient} />
      </div>
    )
  }
}

export default PatientPage
