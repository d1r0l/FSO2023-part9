import express = require('express');
import bmiCalculator from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';

const app = express();
const port = 3002;

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.status(200).send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const bmiArgs = bmiCalculator.parseArguments(req.query);
    const bmiResult = bmiCalculator.calculate(bmiArgs);
    res.status(200).send({ ...bmiArgs, bmi: bmiResult });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage: string = error.message;
      res.status(400).send({ error: errorMessage });
    }
  }
});

app.post('/exercises', (req, res) => {
  try {
    const parsedArgs = exerciseCalculator.parseArguments(req.body);
    const exerciseResult = exerciseCalculator.calculate(parsedArgs);
    res.status(200).send({ exerciseResult });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage: string = error.message;
      res.status(400).send({ error: errorMessage });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
