import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard"

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const BASE_URL = "http://localhost:8000/api/auth";
  const currentUserId = JSON.parse(localStorage.getItem("user"))?.id; // Get current user ID from auth

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${BASE_URL}/Users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      console.log(res.data)
    } catch (err) {
      console.error(err);
    }
  };

  const handleFollow = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${BASE_URL}/${id}/follow`,
        { currentUserId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers(); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnfollow = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${BASE_URL}/${id}/unfollow`,
        { currentUserId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers(); 
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      {users.map((user) => (
        <UserCard
          key={user._id}
          user={user}
          currentUserId={currentUserId}
          handleFollow={handleFollow}
          handleUnfollow={handleUnfollow}
        />
      ))}
    </div>
  );
};

export default UsersList;