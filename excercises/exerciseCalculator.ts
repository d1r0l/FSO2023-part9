const hoursPerDayArray: number[] = [3, 0, 2, 4.5, 0, 3, 1];
const targetDailyHours: number = 2;

interface calculateExcrercises {
  targetDailyHours: number;
  hoursPerDayArray: number[];
}

const parseArgumentsExcerciseCalculator = (
  args: string[],
): calculateExcrercises => {
  if (args.length < 4) throw new Error('not enough arguments');
  if (args.slice(2).every((arg) => !isNaN(Number(arg)))) {
    if (!args.slice(3).every((arg) => Number(arg) <= 24))
      throw new Error(
        'quantity of training hours in a day must be between 0 and 24',
      );
    return {
      targetDailyHours: Number(args[2]),
      hoursPerDayArray: args.slice(3).map((arg) => Number(arg)),
    };
  } else {
    throw new Error('provided values were not numbers!');
  }
};

interface ExcerciseObject {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
}

const exercisesCalculator = (
  targetDailyHours: number,
  hoursPerDayArray: number[],
): ExcerciseObject => {
  const trainingDays = hoursPerDayArray.filter(
    (dayHours) => dayHours !== 0,
  ).length;

  const averageDailyHours =
    hoursPerDayArray.reduce((acc, cur) => acc + cur) / hoursPerDayArray.length;

  const isTargetReached = averageDailyHours >= targetDailyHours;

  const calculateRating = () => {
    const ratio = averageDailyHours / targetDailyHours;
    switch (true) {
      case ratio >= 1 && ratio < 1.5:
        return 1;
      case (ratio >= 0.8 && ratio < 1) || (ratio >= 1.5 && ratio < 2):
        return 2;
      case ratio < 0.8 || ratio >= 2:
        return 3;
    }
  };

  const rating = calculateRating();

  const createRatingDescription = (rating: 1 | 2 | 3) => {
    switch (rating) {
      case 1:
        return 'Excellent';
      case 2:
        return 'Good';
      case 3:
        return 'Poor';
    }
  };

  const ratingDescription = createRatingDescription(rating);

  return {
    periodLength: hoursPerDayArray.length,
    trainingDays: trainingDays,
    success: isTargetReached,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetDailyHours,
    average: averageDailyHours,
  };
};

try {
  const parsedArgs = parseArgumentsExcerciseCalculator(process.argv);
  console.log(
    exercisesCalculator(
      parsedArgs.targetDailyHours,
      parsedArgs.hoursPerDayArray,
    ),
  );
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
