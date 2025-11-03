import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Account } from '../utils/types';
import { createAccount, loginAccount } from '../utils/api';

function Login() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!name.trim()) {
      alert('Please enter a username');
      return;
    }
    try {
      const account: Account = await loginAccount(name);
      alert(`Logging into account: ${account.name}`);
      navigate('/account', { state: { account } });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        alert('User not found');
      } else {
        alert('Login failed');
      }
    }
  };

  const handleCreateAccount = async () => {
    if (!name.trim()) {
      alert('Please enter a username');
      return;
    }
    try {
      const account: Account = await createAccount(name);
      alert(`Created and logged into account: ${account.name}`);
      navigate('/account', { state: { account } });
    } catch (error) {
      alert('User already exists');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="mb-6">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
        </div>

        <br/>

        <div className="flex gap-3">
          <button
            onClick={handleLogin}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
          <button
            onClick={handleCreateAccount}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
