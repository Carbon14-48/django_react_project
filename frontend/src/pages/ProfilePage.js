import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/accounts/me/", {
      headers: {
        "Content-Type": "application/json",
        // If you use JWT token, add it here, for example:
        // "Authorization": "Bearer " + localStorage.getItem("access_token")
      },
      credentials: "include", // if you use cookies for auth
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching profile data");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Error loading profile.</div>;

  return (
    <div className="container">
      <h1>User Profile</h1>
      <p>
        <strong>Username:</strong> {user.username || user.email}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>First Name:</strong> {user.first_name}
      </p>
      <p>
        <strong>Last Name:</strong> {user.last_name}
      </p>
      <p>
        <strong>Member Since:</strong>{" "}
        {new Date(user.date_joined).toLocaleDateString()}
      </p>
      {/* Link to settings page */}
      <p>
        <a href="/settings">Edit Profile</a>
      </p>
    </div>
  );
};

export default ProfilePage;

