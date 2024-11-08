import Lesson from '../models/Lesson.js';
// npm install assemblyai
import './recording.m4a';

const HUGGING_API_KEY=process.env.HUG_API_KEY;
import fs from "fs";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "HUGGING_API_KEY"}
);
export async function main() {
  const transcription = await groq.audio.transcriptions.create({
    file: fs.createReadStream("recording.m4a"),
    model: "distil-whisper-large-v3-en",
    response_format: "verbose_json",
  });
  console.log(transcription.text);
}
   
    

const API_TOKEN = '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'; // Replace with your actual Hugging Face API token

    const API_URL_T5 = 'https://api-inference.huggingface.co/models/google-t5/t5-base';

    export async function translateText(modelUrl, inputText, srcLang, tgtLang) {
      try {
        const response = await fetch(modelUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`,
          },
          body: JSON.stringify({
            inputs: inputText, // Text to translate
            parameters: {
              src_lang: srcLang, // For MBART, we need to specify the source language code
              tgt_lang: tgtLang, // For MBART, we need to specify the target language code
            }
          })
        }
      )
        

        const data = await response.json();

        // Check the response structure and return the translation text
        if (data && data[0]) {
          return data[0].translation_text || data[0].generated_text; // Adjusting for different models' output format
        } else {
          return 'Error occurred while translating: ' + JSON.stringify(data);
        }
      }
      
      catch (error) {
        console.error('Error with translation request:', error);
        return 'Error occurred while translating.';
      }
    }
  // Fetch lessons and translate options as needed
export async function getLessons(req, res,lessons) {
  const { language, stage } = req.query;

  try {
    // Fetch lessons based on the stage (consider adding language as well)
    /*const lessons = await Lesson.find({ stage: stage });

    if (!lessons || lessons.length === 0) {
        console.log(lessons.length);
      return res.status(404).json({ message: 'No lessons found for the provided stage' });
    }*/

    // Translate options for each lesson and add audio URL for correct answers
    main();
    const EN_LANGUAGE_CODE = 'en'
    for (let lesson of lessons) {
      for (let question of lesson.questions) {
        // Translate options if the language is not English
        if (language !== 'en') {
          const translatedOptions = await Promise.all(
            question.options.map(option => translateText(API_URL_T5,option,EN_LANGUAGE_CODE,language))
          );
          question.options = translatedOptions;
        }

        /*if (!question.audioUrl) {
          // Generate an audio URL for the correct answer (using Google TTS)
          const audioUrl = await getAudioFromText(question.correctAnswer, language);
          question.audioUrl = audioUrl;
        }*/
      }
    }

    // Return lessons after translation and audio URL generation
    return res.status(200).json(lessons);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
}

// Create a new lesson
export async function createLesson(req, res) {
  const { title, description, language, stage, content, questions } = req.body;

  try {
    if (!title || !questions || !stage) {
      return res.status(400).json({ message: 'Title, questions, and stage are required' });
    }

    const newLesson = new Lesson({
      title,
      description,
      language,
      stage,
      content,
      questions,
    });

    await newLesson.save();
    res.status(201).json(newLesson);
  } catch (error) {
    console.error('Error creating lesson:', error);
    res.status(500).json({ message: `Failed to create lesson: ${error.message}` });
  }
}

// Fetch a lesson by ID
export async function getLessonById(req, res) {
  const { id } = req.params;

  try {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    return res.status(200).json(lesson);
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
}

    