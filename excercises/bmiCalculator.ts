interface calculateBmi {
  height: number;
  weight: number;
}

const parseArgumentsBmiCalculator = (args: string[]): calculateBmi => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const bmiCalculator = (height: number, weight: number) => {
  const heightInMeters = height / 100;
  const bmi = weight / Math.pow(2, heightInMeters);
  switch (true) {
    case bmi < 16:
      return console.log('Underweight (Severe thinness)');
    case bmi >= 16 && bmi < 17:
      return console.log('Underweight (Moderate thinness)');
    case bmi >= 17 && bmi < 18.5:
      return console.log('Underweight (Mild thinness)');
    case bmi >= 18.5 && bmi < 25:
      return console.log('Normal (Healthy weight)');
    case bmi >= 25 && bmi < 30:
      return console.log('Overweight (Pre-Obese)');
    case bmi >= 30 && bmi < 35:
      return console.log('Obese (Class I)');
    case bmi >= 35 && bmi < 40:
      return console.log('Obese (Class II)');
    case bmi >= 40:
      return console.log('Obese (Class III)');
    default:
      throw new Error('bmi calculation failed');
  }
};

try {
  const parsedArgs = parseArgumentsBmiCalculator(process.argv);
  bmiCalculator(parsedArgs.height, parsedArgs.weight);
} catch (error) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
