import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../store/auth";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading, authChecked } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (!authChecked || loading) return <div>Loading...</div>;
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
        {user.date_joined ? new Date(user.date_joined).toLocaleDateString() : ""}
      </p>
      <p>
        <a href="/settings">Edit Profile</a>
      </p>
    </div>
  );
};

export default ProfilePage;