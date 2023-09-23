import { Patient, NonSensitivePatient, Entry } from '../types';
import patientsData from '../../data/patients';
import { parseNewEntry, parseNewPatient } from '../utils';
import { v1 as uuid } from 'uuid';

let patients = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};
const getPatientsNoSsn = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const getPatientById = (id: string): Patient => {
  const foundPatient = patients.find((patient) => patient.id === id);
  if (foundPatient) return foundPatient;
  else throw new Error('Something went wrong. Error: Incorrect id');
};

const addPatient = (argsObject: unknown): Patient => {
  try {
    const patient = parseNewPatient(argsObject) as Patient;
    patient.id = uuid();
    patients.push(patient);
    return patient;
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    throw new Error(errorMessage);
  }
};

const addEntry = (patientId: string, entry: unknown): Entry => {
  try {
    const selectedPatient = getPatientById(patientId);
    if (selectedPatient) {
      const newEntry = parseNewEntry(entry) as Entry;
      newEntry.id = uuid();
      const updatedPatient = {
        ...selectedPatient,
        entries: selectedPatient.entries.concat(newEntry),
      } as Patient;
      const updatedPatients = patients.map((patient) =>
        patientId === patient.id ? updatedPatient : patient
      );
      patients = updatedPatients;
      console.log(patients.find((patient) => patient.id === patientId));
      return newEntry;
    } else {
      throw new Error('Incorrect id');
    }
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    throw new Error(errorMessage);
  }
};

export { getPatients, getPatientsNoSsn, getPatientById, addPatient, addEntry };
