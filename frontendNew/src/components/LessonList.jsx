import React, { useEffect, useState } from 'react';
import { fetchLessons } from '../services/lessonService';
import Lesson from './Lesson';

function LessonList() {
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        const getLessons = async () => {
            try {
                const response = await fetchLessons();
                setLessons(response.data);
            } catch (error) {
                console.error("Failed to fetch lessons", error);
            }
        };
        getLessons();
    }, []);

    return (
        <div className="lesson-list">
            {lessons.map((lesson) => (
                <Lesson key={lesson._id} lesson={lesson} />
            ))}
        </div>
    );
}

export default LessonList;
