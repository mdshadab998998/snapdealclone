// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { auth, googleProvider } from './firebase';
// import { signInWithPopup, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user); // Set the entire user object here
//     });

//     return () => unsubscribe();
//   }, []);

//   const loginWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
//   const signUpWithEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);
//   const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
//   const logout = () => signOut(auth);

//   // Ensure user is not null before accessing phoneNumber
//   const userPhoneNumber = user ? user.phoneNumber : null;

//   return (
//     <AuthContext.Provider value={{ user, userPhoneNumber, loginWithEmail, signUpWithEmail, loginWithGoogle, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch('https://snapdealbakend.onrender.com//auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Failed to fetch user', error);
        localStorage.removeItem('token');
      }
    }
  };

  const loginWithPhoneNumber = async (phoneNumber, password) => {
    try {
      const response = await fetch('https://snapdealbakend.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber, password })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        navigate('/');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Failed to login', error);
      throw error;
    }
  };

  const registerWithPhoneNumber = async (phoneNumber, password) => {
    try {
      const response = await fetch('https://snapdealbakend.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber, password })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        navigate('/');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Failed to register', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loginWithPhoneNumber, registerWithPhoneNumber, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
