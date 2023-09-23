import {
  Diagnosis,
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  NewPatient,
} from './types';

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

export const parseNewPatient = (data: unknown): NewPatient => {
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

const parseDescription = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing description');
  } else return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  } else return date;
};

const parseSpecialist = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing specialist');
  } else return name;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseEntryType = (type: unknown): EntryWithoutId['type'] => {
  if (!type || !isString(type)) {
    throw new Error('Incorrect or missing type');
  } else {
    switch (type) {
      case 'Hospital':
        return 'Hospital';
      case 'OccupationalHealthcare':
        return 'OccupationalHealthcare';
      case 'HealthCheck':
        return 'HealthCheck';
      default:
        throw new Error('Incorrect or missing type');
    }
  }
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isString(rating)) {
    throw new Error('Incorrect or missing rating');
  } else {
    switch (rating) {
      case 'Healthy':
        return HealthCheckRating.Healthy;
      case 'Low risk':
        return HealthCheckRating.LowRisk;
      case 'High risk':
        return HealthCheckRating.HighRisk;
      case 'Critical risk':
        return HealthCheckRating.CriticalRisk;
      default:
        throw new Error('Incorrect or missing rating');
    }
  }
};

const parseEmployerName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing employer name');
  } else return name;
};

const parseSickLeave = (
  object: unknown
): { startDate: string; endDate: string } => {
  if (!object || !isObject(object)) {
    throw new Error('Incorrect or missing sick leave');
  } else {
    if (
      'startDate' in object &&
      'endDate' in object &&
      object.startDate &&
      object.endDate &&
      isString(object.startDate) &&
      isString(object.endDate)
    ) {
      return {
        startDate: parseDate(object.startDate),
        endDate: parseDate(object.endDate),
      };
    } else throw new Error('Incorrect or missing fields');
  }
};

const parseDischarge = (
  object: unknown
): { date: string; criteria: string } => {
  if (!object || !isObject(object)) {
    throw new Error('Incorrect or missing discharge');
  } else {
    if (
      'date' in object &&
      'criteria' in object &&
      object.date &&
      object.criteria &&
      isString(object.date) &&
      isString(object.criteria)
    ) {
      return {
        date: parseDate(object.date),
        criteria: object.criteria,
      };
    } else throw new Error('Incorrect or missing fields');
  }
};

export const parseNewEntry = (object: unknown): EntryWithoutId => {
  if (!isObject(object)) throw new Error('Incorrect data type');
  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'type' in object
  ) {
    const newEntryBase = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      type: parseEntryType(object.type),
      diagnosisCodes: parseDiagnosisCodes(object),
    };
    const newEntry = newEntryBase as EntryWithoutId;
    switch (newEntry.type) {
      case 'HealthCheck':
        if ('healthCheckRating' in object) {
          newEntry.healthCheckRating = parseHealthCheckRating(
            object.healthCheckRating
          );
          return newEntry;
        } else throw new Error('Incorrect or missing healthCheckRating');
      case 'OccupationalHealthcare':
        if ('employerName' in object) {
          newEntry.employerName = parseEmployerName(object.employerName);
          if ('sickLeave' in object)
            newEntry.sickLeave = parseSickLeave(object.sickLeave);
          return newEntry;
        } else throw new Error('Incorrect or missing employer name');
      case 'Hospital':
        if ('discharge' in object) {
          newEntry.discharge = parseDischarge(object.discharge);
          return newEntry;
        } else throw new Error('Incorrect or missing discharge');
      default:
        throw new Error('Incorrect or missing type');
    }
  } else throw new Error('Incorrect or missing fields');
};
