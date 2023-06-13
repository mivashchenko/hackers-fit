export const calculateBMI = ({weight, height}) => {
    let category;
    let color;
    //Need to determine the constant of some id functions.
    let bmi;
    if (weight && height) {
        bmi = (weight / Math.pow((height / 100), 2)).toFixed(1);
    }


    if (bmi < 18.5) {
        category = "Ниже нормы 😒";
        color = "#ffc44d";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "Нормальный вес 😍";
        color = "#0be881";
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = "Избыточный вес 😮";
        color = "#ff884d";
    } else if (bmi >= 30 && bmi <= 34.9) {
        category = "Ожирение 1 степени 😮";
        color = "#ff5e57";
    } else if (bmi >= 35 && bmi <= 39.9) {
        category = "Ожирение 2 степени 😮";
        color = "#e22b23";
    } else {
        category = "Ожирение 3 степени 😮";
        color = "#b0150e";
    }

    return {category, color, bmi};
}