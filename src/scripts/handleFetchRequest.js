export const handleCookies = (token, userId, userType) => {
  setCookie("userToken", token, {
    path: "/",
  });
  setCookie("userId", userId, {
    path: "/",
  });
  setCookie("userType", userType, {
    path: "/",
  });
};
