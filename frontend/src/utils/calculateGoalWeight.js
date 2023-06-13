export const calculateGoalWeight = ({height, goalBmi}) => {
    const heightSquared = (Number(height)/100) * (Number(height)/100);
    console.log(height * height)
    return heightSquared * goalBmi;
}