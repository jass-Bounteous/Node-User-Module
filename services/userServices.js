const userTemplateCopy = require("../schema/userSchema");

const addUserService = async (user) => {
  const resData = await userTemplateCopy.create(user);
  return resData.data;
};

const isInValid = (data) => {
  return !(
    data.name &&
    data.mobile_no &&
    data.email &&
    data.password &&
    data.emp_code
  );
};

const checkUser = async (id) => {
  const user = await userTemplateCopy.findById(id);
  if (user) return true;
  return false;
};

module.exports = { addUserService, isInValid, checkUser };
