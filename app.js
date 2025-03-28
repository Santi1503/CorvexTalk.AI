import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/", express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/generate", async (req, res) => {
    const {text, targetLang} = req.body;
    
    const promptSystem1 = "Eres un traductor profesional"
    const promptSystem2 = "Solo puedes responder con una traduccion directa del texto que el usuario te envie"
                          + "Cualquier otra respuesta o conversacion esta prohibida"
    const promptUser = `Traduce el siguiente texto a ${targetLang}: ${text}`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "system", content: promptSystem1},
                {role: "system", content: promptSystem2},
                {role: "user", content: promptUser}
            ],
            max_tokens: 500,
            response_format: { type: "text" },
        })

        const translatedText = completion.choices[0].message.content;

        res.status(200).json({
          translatedText
        })

    } catch (error) {
        return res.status(500).json({
            error: "Error al generar la respuesta",
            message: error.message,
        })
    }
  
    
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});