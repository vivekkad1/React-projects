/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { login as reduxLogin, logout as reduxLogout } from '../store/authSlice';
import { clearJobs } from '../store/jobsSlice';

export const AuthContext = createContext({
  user: null,
  loading: true,
  isAuthenticated: false,
  isConfigured: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isConfigured = !!auth;

  useEffect(() => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        };
        setUser(userData);
        dispatch(reduxLogin(userData));
      } else {
        setUser(null);
        dispatch(reduxLogout());
        dispatch(clearJobs());
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [dispatch, isConfigured]);

  const login = async () => {
    if (!isConfigured) {
      throw new Error('Firebase Authentication is not configured. Add your .env values.');
    }
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error('Google Sign In Error:', error);
      throw error;
    }
  };

  const logout = async () => {
    if (!isConfigured) return;
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout Error:', error);
      throw error;
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, isConfigured, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
