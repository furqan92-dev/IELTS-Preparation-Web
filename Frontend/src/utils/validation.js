export const validateUsername = (username) => {
  if (!username) return "Username is required";
  if (username.length < 3) return "Username must be at least 3 characters";
  if (username.length > 15) return "Username must be 15 characters or less";
  if (!/^[A-Za-z][A-Za-z0-9]*$/.test(username)) return "Username must start with a letter and contain only letters and numbers";
  return "";
};

export const validateEmail = (email) => {
  if (!email) return "Email is required";
  const regex = /^[A-za-z0-9]+(?:[.%_+][A-za-z0-9]+)*@[A-za-z0-9]+\.[A-Za-z]{2,}$/;
  if (!regex.test(email)) return "Email is invalid";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_])/;
  if (!regex.test(password)) return "Password must include uppercase, lowercase, number, and special character";
  return "";
};

export const validateConfirmPassword = (confirmPassword, password) => {
  if (!confirmPassword) return "Confirm Password is required";
  if (confirmPassword !== password) return "Password and Confirm Password must match";
  return "";
};