import express from 'express';
import cors from 'cors';
import diagnoses from './routes/diagnoses';
import patients from './routes/patients';

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoses);
app.use('/api/patients', patients);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
