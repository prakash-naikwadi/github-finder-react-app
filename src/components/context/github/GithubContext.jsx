import { createContext, useReducer } from "react";

import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: [],
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get search results

  const searchUsers = async (text) => {
    dispatch({
      type: "SET_LOADING",
    });

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(
      `${process.env.REACT_APP_GITHUB_URL}/search/users?${params}`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );
    const { items } = await response.json();

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  // Get search results

  const getUser = async (login) => {
    dispatch({
      type: "SET_LOADING",
    });

    const response = await fetch(
      `${process.env.REACT_APP_GITHUB_URL}/users/${login}`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );
    const data = await response.json();

    dispatch({
      type: "GET_USER",
      payload: data,
    });
  };
  // Get repositories results

  const getRepos = async (login) => {
    dispatch({
      type: "SET_LOADING",
    });

    const response = await fetch(
      `${process.env.REACT_APP_GITHUB_URL}/users/${login}/repos`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );
    const data = await response.json();

    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        isLoading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
