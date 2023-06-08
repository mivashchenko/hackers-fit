export const calculateBMI = ({weight, height}) => {
    let category;
    let color;
    //Need to determine the constant of some id functions.
    let bmi;

    bmi = (weight / Math.pow((height / 100), 2)).toFixed(1);

    if (bmi < 18.5) {
        category = "Underweight 😒";
        color = "#ffc44d";
    }

    else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "Normal Weight 😍";
        color = "#0be881";
    }

    else if (bmi >= 25 && bmi <= 29.9) {
        category = "Overweight 😮";
        color = "#ff884d";
    }

    else {
        category = "Obese 😱";
        color = "#ff5e57";
    }

    return {category, color, bmi};
}