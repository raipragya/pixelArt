import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/userService';

function UserProfile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserProfile();
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user profile", error);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div>
            <h2>User Profile</h2>
            {user ? (
                <div>
                    <p>Email: {user.email}</p>
                    <p>Points: {user.points}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
}

export default UserProfile;
