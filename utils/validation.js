const isValidEmail = email => email.includes("@");

const isValidPassword = password => password.length > 6;

const isValidName = name => name.length >= 2;

export default {
  isValidEmail,
  isValidPassword,
  isValidName,
};
