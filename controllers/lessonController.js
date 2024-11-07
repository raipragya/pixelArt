import { post } from 'axios';
import { find } from '../models/Lesson';


export async function getLessons(req, res) {
  try {
    const { language, stage } = req.query; // Get language and stage from query parameters
    let lessons = await find({ difficulty: stage });

    if (language && language !== 'English') {
      // Translate each lesson content using the Gemini API
      lessons = await Promise.all(
        lessons.map(async (lesson) => {
          const translatedContent = await translateContent(lesson.content, language);
          return { ...lesson._doc, content: translatedContent };
        })
      );
    }

    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function translateContent(text, language) {
  const response = await post('https://api.gemini.com/translate', {
    text,
    target_lang: language,
    api_key: process.env.GEMINI_API_KEY,
  });
  return response.data.translation;
}
