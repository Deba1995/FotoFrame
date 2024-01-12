export const fetchUser = () => {
  let userInfo = localStorage.getItem("user");
  try {
    userInfo = JSON.parse(userInfo);
  } catch (error) {
    localStorage.removeItem("user");
    userInfo = null;
  }
  return userInfo;
};
