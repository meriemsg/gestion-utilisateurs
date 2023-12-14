import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../context/UserContext'; 
import axiosInstance from '../utils/axiosInstance';

function UserForm({ setUsers = () => {} }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [age, setAge] = useState('');
  const [hometown, setHometown] = useState('');
  const { state } = useUserContext();

  useEffect(() => {
    if (id) {
      axiosInstance.get(`/profiles-list/${id}/`).then((response) => {
        setAge(response.data.age);
        setHometown(response.data.hometown);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('age', age);
    formData.append('hometown', hometown);
    try {
      let response;
      if (id) {
        response = await axiosInstance.patch(`/profiles-update/${id}/`, formData);
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === response.data.id ? response.data : user))
        );
        alert(`update successfully`, navigate(`/profiles-list/${response.data.id}`));
      } else {
        response = await axiosInstance.post('/profiles-create/', formData);
        setUsers((prevUsers) => [response.data, ...prevUsers]);
        alert('create successfully', navigate('/'));
      }
      setAge('');
      setHometown('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{id ? `Edit User ${id}` : 'Create User'}</h2>
        <div className="mb-4">
          <label htmlFor="age" className="block font-medium text-gray-700">
            Age
          </label>
          <input
            type="text"
            name="age"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="border border-gray-400 rounded w-full px-3 py-2 mt-1 text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="hometown" className="block font-medium text-gray-700">
            Hometown
          </label>
          <input
            type="text"
            name="hometown"
            id="hometown"
            value={hometown}
            onChange={(e) => setHometown(e.target.value)}
            required
            className="border border-gray-400 rounded w-full px-3 py-2 mt-1 text-gray-900"
          />
        </div>
        <div className="mt-6 flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            {id ? 'Update User' : 'Create User'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
