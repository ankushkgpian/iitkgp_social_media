export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
export const clearToken = () => localStorage.removeItem('token');
export const isAuthenticated = () => !!getToken();
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
// export const isAuthenticated = () => {
//   const token = localStorage.getItem('token');
//   return token != null && token.length > 10; // crude but safe check
// };

