const PORT = 8000;
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();
const fs = require('fs');
const multer = require('multer');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage }).array('file');
let filePaths = [];

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err);
        }
        filePaths = req.files.map(file => file.path);
        res.json({ message: "Files uploaded successfully" });
    });
});

app.post('/gemini', async (req, res) => {
    try {
        function fileToGenerativePart(path, mimeType) {
            return {
                inlineData: {
                    data: Buffer.from(fs.readFileSync(path)).toString("base64"),
                    mimeType
                }
            };
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const prompt = req.body.message;


        const prompts = filePaths.map(path => ({
            prompt: prompt,
            image: fileToGenerativePart(path, "image/jpeg")
        }));


        const results = await Promise.all(prompts.map(({ prompt, image }) =>
            model.generateContent([prompt, image])
        ));


        const responseTexts = await Promise.all(results.map(result => result.response.text()));


        const combinedResponse = responseTexts.join('\n\n');

        const finalPrompt = `
Generate a comprehensive stream of testing instructions based on the combined context from all uploaded images and the text input. The instructions should be segmented based on the following conditions:

**Core Features to Cover:**
- Source, Destination, and Date Selection
- Bus Selection
- Seat Selection
- Pick-up and Drop-off Point Selection

**Bonus Features:**
- Offers
- Filters
- Bus Information

**Test Case Details:**
- Description
- Pre-conditions
- Testing Steps
- Expected Result

The testing instructions should be well-organized and detailed. Each test case should include a description, pre-conditions, testing steps, and expected results. Ensure the instructions cover all elements and images provided.

Here is the aggregated context:
${combinedResponse}
`;

        const finalResult = await model.generateContent([finalPrompt]);
        const finalResponse = await finalResult.response.text();

        // Format response
        const formattedResponse = `
            <div class="testing-instructions">
                <h2>Comprehensive Testing Instructions</h2>
                <p>${finalResponse
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/##(.*?)\n/g, '<h3>$1</h3>')
            .replace(/\n/g, '<br>')
        }</p>
            </div>
        `;

        res.send(formattedResponse);

    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while processing your request.");
    }
});

app.listen(PORT, () => console.log("Listening to changes on PORT " + PORT));
