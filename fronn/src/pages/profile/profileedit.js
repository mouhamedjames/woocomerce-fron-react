import React, { useState } from 'react';

const EditProfilePage = ({ user, onSaveProfile }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [location, setLocation] = useState(user.location);

  const handleSaveProfile = () => {
    const updatedProfile = {
      name,
      email,
      location
    };
    onSaveProfile(updatedProfile);
  };

  return (
    <div className="edit-profile">
      <h1>Edit Profile</h1>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleSaveProfile}>
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;
