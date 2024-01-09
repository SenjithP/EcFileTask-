export const validateUserRegistration = ({
  userName,
  userEmail,
  userPassword,
  userMobileNumber,
}) => {
  if (
    !userName ||
    userName.trim().length === 0 ||
    !userEmail ||
    userEmail.trim().length === 0 ||
    !userPassword ||
    userPassword.trim().length === 0 ||
    !userMobileNumber ||
    userMobileNumber.trim().length === 0
  ) {
    return {
      valid: false,
      message: "All fields are required",
      statusCode: 400,
    };
  }

  if (/\d/.test(userName)) {
    return {
      valid: false,
      message: "Name should not contain numbers",
      statusCode: 500,
    };
  }

  if (!/^[a-zA-Z0-9._]+@gmail\.com$/.test(userEmail)) {
    return {
      valid: false,
      message: "Email should be in proper format",
      statusCode: 500,
    };
  }

  if (!/^[6-9]\d{9}$/.test(userMobileNumber)) {
    return {
      valid: false,
      message:
        "Mobile number should start with 6, 7, 8, or 9 and should have a total of 10 digits",
      statusCode: 500,
    };
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(userPassword)) {
    return {
      valid: false,
      message:
        "Password should contain at least 1 capital, 1 small, 1 special character, 1 number, and min 8 characters",
      statusCode: 400,
    };
  }

  return { valid: true };
};
