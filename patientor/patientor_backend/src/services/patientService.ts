import { Patient, PatientNoSsn } from '../types';
import patients from '../../data/patients';

const getPatients = (): Patient[] => {
  return patients;
};
const getPatientsNoSsn = (): PatientNoSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

export { getPatients, getPatientsNoSsn };
