import React, { useState, useEffect } from 'react'
import { Client, Account } from 'appwrite'
import { account } from '../lib/appwrite'

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get()
        setIsLoggedIn(true)
        
      } catch (error) {
        setIsLoggedIn(false)
      }
    }

    checkSession()
  }, [])

  const handleLogout = async () => {
    try {
      await account.deleteSession('current') // Logs out the current session
      setIsLoggedIn(false)
            window.location.href = '/';

    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  return (
    <div className=''>
      <div className="flex justify-between items-center">
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="px-1.5 py-0.5 md:px-4 md:py-2 font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700 m-auto"
          >
            End Session
          </button>
        )}
      </div>
    </div>
  )
}

export default Footer
