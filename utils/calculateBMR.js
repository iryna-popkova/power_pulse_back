const calculateBMR = (desiredWeight, height, birthday, sex, levelActivity) => {
  const activityLevelFactor = { 1: 1.2, 2: 1.375, 3: 1.55, 4: 1.725, 5: 1.9 };
  const sexData = { male: { factor: 5 }, female: { factor: -161 } };

  const bdDate = new Date(birthday);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - bdDate.getFullYear();

  let bmr;

  if (sex === "male") {
    bmr = Math.round(
      (10 * desiredWeight + 6.25 * height - 5 * age + sexData.male.factor) *
        activityLevelFactor[levelActivity]
    );
  } else if (sex === "female") {
    bmr = Math.round(
      (10 * desiredWeight + 6.25 * height - 5 * age + sexData.female.factor) *
        activityLevelFactor[levelActivity]
    );
  } else {
    throw new Error('Виберіть стать "male" або "female"');
  }

  return bmr;
};

module.exports = calculateBMR;
