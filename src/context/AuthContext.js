import React, { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

// Initial state checks localStorage for a logged-in user
const initialState = {
  isAuthenticated: false,
  user: null,
};

// Reducer to manage login, signup, and logout actions
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
    case 'SIGNUP':
      // When a user logs in or signs up, update the state
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'LOGOUT':
      // When a user logs out, clear their data
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case 'LOAD_USER':
        // On initial app load, set user from localStorage
        return {
            ...state,
            isAuthenticated: !!action.payload,
            user: action.payload,
        };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // On initial app load, check for a user in localStorage
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('globalMartUser'));
      if (storedUser) {
        dispatch({ type: 'LOAD_USER', payload: storedUser });
      }
    } catch (error) {
      console.error("Failed to load user from localStorage", error);
    }
  }, []);

  // Login function to be called from the Login component
  const login = (userData) => {
    localStorage.setItem('globalMartUser', JSON.stringify(userData));
    dispatch({ type: 'LOGIN', payload: userData });
  };

  // Signup function to be called from the Signup component
  const signup = (userData) => {
    localStorage.setItem('globalMartUser', JSON.stringify(userData));
    dispatch({ type: 'SIGNUP', payload: userData });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('globalMartUser');
    dispatch({ type: 'LOGOUT' });
  };

  const value = { ...state, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}