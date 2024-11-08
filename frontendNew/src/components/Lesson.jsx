import React from 'react';

function Lesson({ lesson }) {
    return (
        <div className="lesson">
            <h3>{lesson.title}</h3>
            <p>{lesson.description}</p>
        </div>
    );
}

export default Lesson;
