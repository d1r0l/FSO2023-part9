interface calculateExcrercises {
  target: number;
  daily_exercises: number[];
}

interface ExcerciseObject {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
}

const parseArguments = (args: unknown): calculateExcrercises => {
  const exercisesArgs = args as calculateExcrercises;
  const errorWrongArgs = new Error('malformatted parameters');
  if (!exercisesArgs.target || !exercisesArgs.daily_exercises)
    throw new Error('parameters missing');
  if (!isNaN(Number(exercisesArgs.target)) && Number(exercisesArgs.target) > 24)
    throw errorWrongArgs;
  if (exercisesArgs.daily_exercises.every((arg) => !isNaN(Number(arg)))) {
    if (!exercisesArgs.daily_exercises.every((arg) => Number(arg) <= 24))
      throw errorWrongArgs;
    return {
      target: Number(exercisesArgs.target),
      daily_exercises: exercisesArgs.daily_exercises.map((arg) => Number(arg)),
    };
  } else {
    throw errorWrongArgs;
  }
};

const calculate = (args: calculateExcrercises): ExcerciseObject => {
  const target = args.target;
  const daily_exercises = args.daily_exercises;

  const trainingDays = daily_exercises.filter(
    (dayHours) => dayHours !== 0,
  ).length;

  const averageDailyHours =
    daily_exercises.reduce((acc, cur) => acc + cur) / daily_exercises.length;

  const isTargetReached = averageDailyHours >= target;

  const calculateRating = (): 1 | 2 | 3 => {
    const ratio = averageDailyHours / target;
    switch (true) {
      case ratio >= 1 && ratio < 1.5:
        return 1;
      case (ratio >= 0.8 && ratio < 1) || (ratio >= 1.5 && ratio < 2):
        return 2;
      case ratio < 0.8 || ratio >= 2:
        return 3;
      default:
        throw new Error('rating calculation failed');
    }
  };

  const rating = calculateRating();

  const createRatingDescription = (rating: 1 | 2 | 3): string => {
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
    periodLength: daily_exercises.length,
    trainingDays: trainingDays,
    success: isTargetReached,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: averageDailyHours,
  };
};

export default { parseArguments, calculate };
