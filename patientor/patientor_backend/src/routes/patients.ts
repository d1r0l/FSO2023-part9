import express from 'express';
import { getPatientById, getPatientsNoSsn } from '../services/patientService';
import { addPatient } from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getPatientsNoSsn());
});

router.get('/:id', (req, res) => {
  try {
    res.send(getPatientById(req.params.id));
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else res.status(400).send('Something went wrong');
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = addPatient(req.body);
    res.status(200).send(newPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else res.status(400).send('Something went wrong');
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    console.log(req.body);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else res.status(400).send('Something went wrong');
  }
});

export default router;
