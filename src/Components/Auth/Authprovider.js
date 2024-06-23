import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from './firebase';
import { signInWithPopup, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set the entire user object here
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const signUpWithEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);

  // Ensure user is not null before accessing phoneNumber
  const userPhoneNumber = user ? user.phoneNumber : null;

  return (
    <AuthContext.Provider value={{ user, userPhoneNumber, loginWithEmail, signUpWithEmail, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
