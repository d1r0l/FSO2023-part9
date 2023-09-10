import express = require('express');
import bmiCalculator from './bmiCalculator';
import bmiCalculator from './bmiCalculator';

const app = express();
const port = 3002;
const port = 3002;

app.get('/hello', (_req, res) => {
  res.status(200).send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const bmiArgs = bmiCalculator.parseArguments(req.query);
    const bmiResult = bmiCalculator.calculate(bmiArgs);
    res.status(200).send({ ...bmiArgs, bmi: bmiResult });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
