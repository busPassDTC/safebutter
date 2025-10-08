import React, { useState } from "react";
import { account } from "../lib/appwrite";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await account.createEmailPasswordSession(email, password);
      window.location.href = "/";
    } catch (error) {
      alert("Login failed", error);
    }
  };

  const handleRegister = async () => {
    // e.preventDefault();
    // try {
    //   await account.create('unique()', email, password, name);
    //   await handleLogin(e);
    // } catch (error) {
    //   console.error('Registration failed', error);
    // }
    // console.alert('Registration Not supported, Login');
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center ">
      <div className="w-full max-w-md p-24 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">
          {isRegistering ? "Create an Account" : "Login to SafeFlow"}
        </h2>
        <form
          onSubmit={isRegistering ? handleRegister : handleLogin}
          className="space-y-6"
        >
          {/* {isRegistering && (
            <div>
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-1 mt-1 text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )} */}

          {isRegistering ? (
            <div className="text-center py-6">
              New signups are not available
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="email" className="text-sm font-medium py-8">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-1 mt-1 text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-1 mt-1 text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>
        <p className="text-sm text-center">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="font-medium text-blue-500 dark:text-blue-400 "
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
