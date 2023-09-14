import express from 'express';
import { getPatientsNoSsn } from '../services/patientService';

const router = express.Router();

router.use('/', (_req, res) => {
  res.send(getPatientsNoSsn());
});

export default router;
