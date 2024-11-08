import { Router } from 'express';
import { getLessons, getLessonById, createLesson } from '../controllers/lessonController.js';
import Lesson from '../models/Lesson.js';

const router = Router();

// Get lessons by language and stage
router.get('/', async (req, res) => {
  try {
    const { language, stage } = req.query;

    if (!language || !stage) {
      return res.status(400).json({ message: 'Language and stage are required' });
    }
    const lessons = [{
      title: "Basic Spanish Grammar",
      description: "Learn the fundamental rules of Spanish grammar.",
      language: "es",
      stage: "Beginner",
      content: "English grammar is the system and structure of the English language.",
      questions: [
        {
          questionText: "What is the plural form of 'book'?",
          options: ["book", "books", "booked", "booking"],
          correctAnswer: "books"
        },
        {
          questionText: "What is the past tense of 'eat'?",
          options: ["eat", "eated", "eaten", "eating"],
          correctAnswer: "eaten"
        },
        {
          questionText: "Which sentence is grammatically correct?",
          options: ["I am going to the store.", "I going to the store.", "I goes to the store.", "I go to the store."],
          correctAnswer: "I am going to the store."
        }
      ]
    }];
    
    //lesson1.save()
      //.then(() => console.log('Lesson 4 created successfully'))
     // .catch(err => console.error('Error creating lesson:', err));

    // Call the controller's getLessons method, which sends a response
    await getLessons(req, res,lessons);  // Let the controller handle sending the response
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get a specific lesson by ID
router.get('/:id', getLessonById);

// Create a new lesson
router.post('/', createLesson);

export default router;
