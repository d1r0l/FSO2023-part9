import { Patient, NonSensitivePatient } from '../types';
import patientsData from '../../data/patients';
import parseNewPatient from '../utils';
import { v1 as uuid } from 'uuid';

const patients = patientsData;

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
    const Patient = parseNewPatient(argsObject) as Patient;
    Patient.id = uuid();
    patients.push(Patient);
    return Patient;
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    throw new Error(errorMessage);
  }
};

export { getPatients, getPatientsNoSsn, getPatientById, addPatient };
