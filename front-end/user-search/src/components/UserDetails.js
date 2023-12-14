import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import UserForm from "./UserForm";

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    axiosInstance.get(`/profiles-list/${id}/`).then((response) => {
      setUser(response.data);
    });
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      const response = await axiosInstance.patch(
        `/profiles-update/${id}/`,
        formData
      );
      setUser(response.data);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (editing) {
    return <UserForm user={user} handleSubmit={handleUpdate} />;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto my-8 p-4 bg-white shadow-lg rounded-lg">
     
      <p className="text-gray-600 text-lg mb-4">Age: {user.age}</p>
      <p className="text-gray-600 text-lg mb-4">Hometown: {user.hometown}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => setEditing(true)}
      >
        Edit User
      </button>
    </div>
  );
}

export default UserDetail;
