import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Diagnosis, Patient } from '../../types'
import patientService from '../../services/patients'
import diagnosesService from '../../services/diagnoses'
import EntryList from './EntryList'
import PatientInfo from './PatientInfo'
import AddEntryForm from './AddEntryForm'

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>()
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
  const { patientId } = useParams()

  useEffect(() => {
    const fetchPatientAndDiagnoses = async () => {
      if (patientId) {
        const patient = await patientService.getById(patientId)
        const diagnoses = await diagnosesService.getAll()
        void setPatient(patient)
        void setDiagnoses(diagnoses)
      }
    }
    void fetchPatientAndDiagnoses()
  }, [patientId])

  if (patient) {
    return (
      <div>
        <PatientInfo patient={patient} />
        <AddEntryForm
          patient={patient}
          setPatient={setPatient}
          diagnoses={diagnoses}
        />
        <EntryList diagnoses={diagnoses} patient={patient} />
      </div>
    )
  } else {
    return <div />
  }
}

export default PatientPage
