import React, { useState } from 'react';
import { register } from '../services/authService';
function SignUp() {
    // Define state variables for each form field
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [languages, setLanguages] = useState([]);
    const [stage, setStage] = useState('');

    const availableLanguages = ["English", "Spanish", "French", "German"]; // Example languages
    const stages = ["Beginner", "Intermediate", "Advanced"]; // Example stages

    // Handle form submission
    const handleSubmit = async(event) => {
        event.preventDefault();
        
        // Prepare the form data
        const formData = {
            username,
            email,
            password,
            languages,
            stage,
        };
        try {
            const response = await register(formData);
            console.log("registered succesfully",response.data);
            //navigate('/SignIn');
            

        }
        catch(error){
            console.log("registration failed due to",error)

        }

        
        

        // Here, you would typically send the formData to your backend API
        
    };

    // Handle language selection
    const handleLanguageChange = (language) => {
        setLanguages((prev) => {
            if (prev.includes(language)) {
                return prev.filter((lang) => lang !== language);
            } else if (prev.length < 2) { // Limit to 2 languages
                return [...prev, language];
            } else {
                alert("You can only select two languages.");
                return prev;
            }
        });
    };

    return (
    <div>
        <header className="header-gif">
        </header>
        <div className="form-container">

            <h2 className="heading">Register</h2>
            <form onSubmit={handleSubmit}>
                {/* Username */}
                <label>
                    Username:
                    <input 
                        type="text" 
                        className="form-input"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </label>

                {/* Email */}
                <label>
                    Email:
                    <input 
                        type="email" 
                        className="form-input"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </label>

                {/* Password */}
                <label>
                    Password:
                    <input 
                        type="password" 
                        className="form-input"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </label>

                {/* Languages Interested */}
                <fieldset>
                    <legend>Languages Interested (Select up to 2):</legend>
                    {availableLanguages.map((language) => (
                        <label key={language}>
                            <input
                                type="checkbox"
                                className='form-input'
                                value={language}
                                checked={languages.includes(language)}
                                onChange={() => handleLanguageChange(language)}
                            />
                            {language}
                        </label>
                    ))}
                </fieldset>

                {/* Stage */}
                <label>
                    Stage:
                    <select value={stage} onChange={(e) => setStage(e.target.value)} required>
                        <option value="">Select Stage</option>
                        {stages.map((stageOption) => (
                            <option key={stageOption} value={stageOption}>
                                {stageOption}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Submit Button */}
                <button type="submit" className="form-button">Register</button>
            </form>
        </div>
        </div>
    );
}

export default SignUp;
