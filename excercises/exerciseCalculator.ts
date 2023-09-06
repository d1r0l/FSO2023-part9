const hoursPerDayArray: number[] = [3, 0, 2, 4.5, 0, 3, 1];
const targetDailyHours: number = 2;

interface ExcerciseObject {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
}

const calculateExercises = (
  hoursPerDayArray: number[],
  targetDailyHours: number,
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
      case ratio >= 1 && ratio <= 1.5:
        return 1;
      case ratio < 1 || ratio > 1.5:
        return 2;
      case ratio < 0.5 || ratio > 2:
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
    target: targetDailyHours,
    average: averageDailyHours,
    success: isTargetReached,
    rating: rating,
    ratingDescription: ratingDescription,
  };
};

try {
  console.log(calculateExercises(hoursPerDayArray, targetDailyHours));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
