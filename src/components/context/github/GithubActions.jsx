// Get search results

export const searchUsers = async (text) => {
  // dispatch({
  //   type: "SET_LOADING",
  // });

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

  // dispatch({
  //   type: "GET_USERS",
  //   payload: items,
  // });

  return items;
};

// Get single user results

export const getUser = async (login) => {
  // dispatch({
  //   type: "SET_LOADING",
  // });

  const response = await fetch(
    `${process.env.REACT_APP_GITHUB_URL}/users/${login}`,
    {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    }
  );
  const data = await response.json();

  return data;

  // dispatch({
  //   type: "GET_USER",
  //   payload: data,
  // });
};
// Get repositories results

export const getRepos = async (login) => {
  // dispatch({
  //   type: "SET_LOADING",
  // });

  const response = await fetch(
    `${process.env.REACT_APP_GITHUB_URL}/users/${login}/repos`,
    {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    }
  );
  const data = await response.json();

  return data;

  // dispatch({
  //   type: "GET_REPOS",
  //   payload: data,
  // });
};
