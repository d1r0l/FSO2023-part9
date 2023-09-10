interface calculateBmi {
  height: number;
  weight: number;
}

const parseArguments = (args: unknown): calculateBmi => {
  const bmiArgs = args as calculateBmi;
  const error = new Error('malformatted parameters');
  if (!bmiArgs.weight || !bmiArgs.height) throw error;
  if (!isNaN(Number(bmiArgs.height)) && !isNaN(Number(bmiArgs.weight))) {
    if (bmiArgs.weight <= 0 || bmiArgs.height <= 0) throw error;
    return {
      height: Number(bmiArgs.height),
      weight: Number(bmiArgs.weight),
    };
  } else {
    throw error;
  }
};

const calculate = (args: calculateBmi): string => {
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
};

export default { parseArguments, calculate };
