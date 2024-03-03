// const sessionIdToUserMap = new Map(); StateFull Authentication
// function setUser(id, user) {
//   sessionIdToUserMap.set(id, user);
// }

// function getUser(id) {
//   return sessionIdToUserMap.get(id);
// }

// Stateless Authentication
const jwt = require("jsonwebtoken");
const secret = "Neeti$123@$";

// This function will create token for ourselves
function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
