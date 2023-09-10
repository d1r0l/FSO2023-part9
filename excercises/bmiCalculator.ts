interface calculateBmi {
  height: number;
  weight: number;
}

const parseArguments = (args: unknown): calculateBmi => {
  const bmiArgs = args as calculateBmi;
  if (!bmiArgs.weight && !bmiArgs.height)
    throw new Error('malformatted parameters: weight & height is required');
  if (!bmiArgs.height)
    throw new Error('malformatted parameters: height is required');
  if (!bmiArgs.weight)
    throw new Error('malformatted parameters: weight is required');
  if (bmiArgs.weight <= 0)
    throw new Error(
      'malformatted parameters: weight cannot be zero or negative',
    );
  if (bmiArgs.height <= 0)
    throw new Error(
      'malformatted parameters: height cannot be zero or negative',
    );

  if (!isNaN(Number(bmiArgs.height)) && !isNaN(Number(bmiArgs.weight))) {
    return {
      height: Number(bmiArgs.height),
      weight: Number(bmiArgs.weight),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculate = (args: calculateBmi): string => {
  try {
    const { height, weight } = args;
    const heightInMeters = height / 100;
    const bmi = weight / Math.pow(heightInMeters, 2);
    switch (true) {
      case bmi < 16:
        return 'Underweight (Severe thinness)';
      case bmi >= 16 && bmi < 17:
        return 'Underweight (Moderate thinness)';
      case bmi >= 17 && bmi < 18.5:
        return 'Underweight (Mild thinness)';
      case bmi >= 18.5 && bmi < 25:
        return 'Normal (Healthy weight)';
      case bmi >= 25 && bmi < 30:
        return 'Overweight (Pre-Obese)';
      case bmi >= 30 && bmi < 35:
        return 'Obese (Class I)';
      case bmi >= 35 && bmi < 40:
        return 'Obese (Class II)';
      case bmi >= 40:
        return 'Obese (Class III)';
      default:
        throw new Error('bmi calculation failed');
    }
  } catch (error) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return errorMessage;
  }
};

export default { parseArguments, calculate };
