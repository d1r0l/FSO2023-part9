import express from 'express';
import { getPatientsNoSsn } from '../services/patientService';
import { addPatient } from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getPatientsNoSsn());
});

router.post('/', (req, res) => {
  try {
    const newPatient = addPatient(req.body);
    res.status(200).send(newPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else res.status(400).send('Something went wrong');
  }
});

export default router;
