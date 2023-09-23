import { useState, useEffect } from 'react'
import patientService from '../../services/patients'
import { Patient } from '../../types'
import { useParams } from 'react-router-dom'
import EntryList from './EntryList'
import PatientInfo from './PatientInfo'
import AddEntryForm from './AddEntryForm'

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>()
  let { patientId } = useParams()

  useEffect(() => {
    if (patientId) {
      void patientService
        .getById(patientId)
        .then(patient => setPatient(patient))
    }
  }, [patientId])

  if (patient) {
    return (
      <div>
        <PatientInfo patient={patient} />
        <AddEntryForm patient={patient} setPatient={setPatient} />
        <EntryList patient={patient} />
      </div>
    )
  } else {
    return <div />
  }
}

export default PatientPage
