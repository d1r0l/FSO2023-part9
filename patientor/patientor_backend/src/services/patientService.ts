import { Patient, PatientNoSsn } from '../types';
import patientsData from '../../data/patients';
import parseNewPatient from '../utils';
import { v1 as uuid } from 'uuid';

const patients = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};
const getPatientsNoSsn = (): PatientNoSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
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

export { getPatients, getPatientsNoSsn, addPatient };
