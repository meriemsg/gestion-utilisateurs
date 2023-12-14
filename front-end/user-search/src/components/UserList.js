import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext'; 
import axiosInstance from '../utils/axiosInstance';
import UserForm from './UserForm';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

function UserList() {
  const [users, setUsers] = useState([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({
    hometown: '',
    minAge: '',
    maxAge: '',
    gender: '',
  });
  const { state } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axiosInstance.get('/profiles-list/', {
          params: searchCriteria,
        });
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, [searchCriteria]);

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const filteredUsers = users?.filter((user) => {
    const age = parseInt(user.age, 10);
    const minAge = searchCriteria.minAge !== '' ? parseInt(searchCriteria.minAge, 10) : 0;
    const maxAge = searchCriteria.maxAge !== '' ? parseInt(searchCriteria.maxAge, 10) : Infinity;

    return (
      (!searchCriteria.hometown || user.hometown.includes(searchCriteria.hometown)) &&
      (age >= minAge && age <= maxAge) &&
      (!searchCriteria.gender || user.gender === searchCriteria.gender)
    );
  });

  return (
    <div className="container mx-auto px-4">
      {state.user && (
        <div className="flex justify-between items-center my-8">
          <button
            onClick={() => setShowUserForm(true)}
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Create User
          </button>
        </div>
      )}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            name="hometown"
            value={searchCriteria.hometown}
            onChange={handleInputChange}
            placeholder="Hometown"
            className="p-2 border rounded focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="minAge"
            value={searchCriteria.minAge}
            onChange={handleInputChange}
            placeholder="Min Age"
            className="p-2 border rounded focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="maxAge"
            value={searchCriteria.maxAge}
            onChange={handleInputChange}
            placeholder="Max Age"
            className="p-2 border rounded focus:outline-none focus:border-blue-500"
          />
          <select
            name="gender"
            value={searchCriteria.gender}
            onChange={handleInputChange}
            className="p-2 border rounded focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Search
          </button>
        </div>
      </form>
      <p className="mb-4 text-gray-700">
        {filteredUsers.length > 0
          ? `Results.`
          : 'No users found.'}
      </p>
      {filteredUsers.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUsers.map((user) => (
            <li key={user.id} className="border border-gray-400 rounded-lg overflow-hidden shadow-md">
              <Link to={`users/${user.id}/`} className="block p-4">
              <div className="p-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    {user.id}
                  </h2>
                </div>
              </Link>
              <div className="bg-gray-100 px-4 py-3 flex justify-between items-center">
             
                <button
                  className="text-blue-500 font-medium hover:text-blue-600"
                  onClick={() => {
                    setShowUserForm(true);
                    navigate(`/users/${user.id}/edit`);
                  }}
                >
                  <FaEdit />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
      {showUserForm && <UserForm setUsers={setUsers} setShowUserForm={setShowUserForm} />}
    </div>
  );
}

export default UserList;
