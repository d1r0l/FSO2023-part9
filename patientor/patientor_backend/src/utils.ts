import { Gender, NewPatient } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isObject = (object: unknown): object is object => {
  return (
    object !== null &&
    typeof object === 'object' &&
    !(object instanceof Array || Array.isArray(object))
  );
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  } else return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth: ' + date);
  } else return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  } else return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  } else return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  } else return occupation;
};

const parseNewPatient = (data: unknown): NewPatient => {
  if (!isObject(data)) throw new Error('Incorrect data type');
  if (
    'name' in data &&
    'dateOfBirth' in data &&
    'ssn' in data &&
    'gender' in data &&
    'occupation' in data
  ) {
    return {
      name: parseName(data.name),
      dateOfBirth: parseDateOfBirth(data.dateOfBirth),
      ssn: parseSsn(data.ssn),
      gender: parseGender(data.gender),
      occupation: parseOccupation(data.occupation),
      entries: [],
    };
  } else throw new Error('Incorrect or missing fields');
};

export default parseNewPatient;
