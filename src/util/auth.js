import React, { useState, useEffect, useContext, createContext } from "react";
import axios from 'axios';
import { BASE_URL } from "../config";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and update when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (email, password) => {
    return new Promise((resolve, reject) => {
      axios({
        url: BASE_URL+'/user/login',
        method: 'post',
        data: { email, password }
      })
      .then(({ data }) => {
        window.localStorage.setItem("access_token", data.token);

        getCurrentUser().then(user => {
          setUser(data);
          resolve(data);
        })
      })
      .catch(error => reject(new CustomError(error.code, error.message)));
    })
  }

  const signup = (email, password) => {
    return new Promise((resolve, reject) => {
      axios({
        url: BASE_URL+'/user/signup',
        method: 'post',
        data: { email, password }
      })
      .then(res => signin(email, password).then(() => resolve()))
      .catch(error => reject(new CustomError(error.code, error.message)));
    });
  };

  const signout = () => {
    localStorage.removeItem("access_token");
    setUser(false);
  };

  // Get the current user using stored access_token
  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const accessToken = window.localStorage.getItem("access_token");
      if (accessToken) {
        axios({
          method: 'get',
          url: BASE_URL+'/user',
          headers: {
            "authorization": accessToken
          }
        })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
      } else {
        resolve(false);
      }
    });
  };

  // Get user on mount
  useEffect(() => {
    getCurrentUser().then(user => {
      setUser(user);
    });
  }, []);

  return {
    user,
    signin,
    signup,
    signout,
  };
}

function CustomError(code, message) {
  const displayMessage = typeof message === "string" ? message : code;
  const error = new Error(displayMessage);
  error.code = code;
  return error;
}
