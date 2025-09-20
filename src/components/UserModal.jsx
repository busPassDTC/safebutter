import React, { useState } from 'react';
import { account } from '../lib/appwrite';

const UserModal = ({ user, numNotes, onClose }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const handleUpdateName = async (e) => {
    e.preventDefault();
    try {
      await account.updateName(name);
      alert('Name updated successfully!');
    } catch (error) {
      console.error('Failed to update name', error);
      alert('Failed to update name');
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    try {
      await account.updateEmail(email, oldPassword);
      alert('Email updated successfully! Please verify your new email.');
    } catch (error) {
      console.error('Failed to update email', error);
      alert('Failed to update email. Check your password.');
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      await account.updatePassword(password, oldPassword);
      alert('Password updated successfully!');
    } catch (error) {
      console.error('Failed to update password', error);
      alert('Failed to update password. Check your old password.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg text-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <div className="mb-4">
          <p><span className="font-semibold">Name:</span> {user.name}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Number of notes:</span> {numNotes}</p>
        </div>

        <div className="space-y-6">
          <form onSubmit={handleUpdateName}>
            <label className="block font-semibold">Update Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md"
            />
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md">Update Name</button>
          </form>

          <form onSubmit={handleUpdateEmail}>
            <label className="block font-semibold">Update Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md"
            />
            <input
              type="password"
              placeholder="Current Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md"
            />
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md">Update Email</button>
          </form>

          <form onSubmit={handleUpdatePassword}>
            <label className="block font-semibold">Update Password</label>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md"
            />
            <input
              type="password"
              placeholder="Current Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md"
            />
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md">Update Password</button>
          </form>
        </div>

        <div className="flex justify-end mt-6">
          <button onClick={onClose} className="px-4 py-2 text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-600 rounded-md">Close</button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
