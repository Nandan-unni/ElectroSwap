const emailRegex = (email = "") => {
  const validEmailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return String(email).match(validEmailRegex);
};

const phoneRegex = (phone = "") => {
  const validPhoneRegex = /^[6-9]\d{9}$/;
  return String(phone).match(validPhoneRegex);
};

export const validator = {
  email: (email = "") => {
    if (email === null) return "";
    else if (!email) return "Email cannot be left empty";
    else if (!emailRegex(email)) return "Enter a valid email";
    return "";
  },
  password: (password = "") => {
    if (password === null) return "";
    else if (!password) return "Password cannot be left empty";
    else if (password?.length < 8)
      return "Password must be atleast 8 characters";
    return "";
  },
  name: (name) => {
    if (name === null) return "";
    else if (!name) return "Name cannot be empty";
    return "";
  },
  string: (string) => {
    if (string === null) return "";
    else if (!string) return "Vehicle cannot be empty";
  },
  phone: (phone) => {
    if (phone === null) return "";
    else if (!phoneRegex(phone))
      return "Phone cannot be empty or must contain 10 numericals";
  },
};
