export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Array<Diagnosis['code']>
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'Low risk' = 1,
  'High risk' = 2,
  'Critical risk' = 3
}

export enum EntryType {
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare',
  Hospital = 'Hospital'
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck
  healthCheckRating: HealthCheckRating
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare
  employerName: string
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital
  discharge: {
    date: string
    criteria: string
  }
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Patient {
  id: string
  name: string
  occupation: string
  gender: Gender
  ssn?: string
  dateOfBirth?: string
  entries: Entry[]
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never

export type EntryFormValues = UnionOmit<Entry, 'id'>
