require('dotenv').config();
const {Configuration, OpenAIApi} = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const createPrompt = (
    reqBody = {}
) => {
    const {
        age,
        height,
        weight,
        goalWeight,
        extraWeight,
        deficitWeight,
        pal,
        bmi,
        bmr
    } = reqBody;
    return `Сформируй распределение калорий для клиента с суточным калоражем: ${bmr}. 
            Учитывай ограничения, дигнозы и наследственность.
            Клиент: женщина ${age} лет, вес ${weight}кг. PAL ${pal}.
            Диагнозы: инсулинорезистентность, увеличенная печень, гастрит
            Количество приемов пищи: 5 - 3 основных и 2 перекуса.

            Результат выдай без пояснений в виде сухих данных, списком через запятую, Цифры округляй`
}

const getCompletionRequest = (prompt) => {
    return {
        model: "gpt-3.5-turbo",
        messages: [
            {"role": "system", "content": "Действуй как нутрициолог."},
            {
                "role": "user",
                "content": prompt
            },
        ],
        max_tokens: 2048,
        temperature: 0,
        // diversity_penalty: 0,
        // top_p: 0,
    }
}


exports.createPrompt = createPrompt
exports.getCompletionRequest = getCompletionRequest
exports.openaiConnection = new OpenAIApi(configuration)