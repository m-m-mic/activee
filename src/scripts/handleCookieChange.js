// Ändert cookies, wenn Nutzer Profil wechselt
export const handleCookieChange = (setCookie, token, userId, userType, userTier) => {
  setCookie("userToken", token, {
    path: "/",
  });
  setCookie("userId", userId, {
    path: "/",
  });
  setCookie("userType", userType, {
    path: "/",
  });
  setCookie("userTier", userTier, {
    path: "/",
  });
};

// Löscht cookies, wenn Nutzer sich abmeldet
export const handleLogout = (removeCookie, navigate) => {
  removeCookie("userToken", {
    path: "/",
  });
  removeCookie("userId", {
    path: "/",
  });
  removeCookie("userType", {
    path: "/",
  });
  removeCookie("userTier", {
    path: "/",
  });
  navigate("/");
};
