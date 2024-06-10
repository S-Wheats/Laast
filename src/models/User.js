const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "users.json");

function readUsersFile() {
  if (!fs.existsSync(usersFilePath)) {
    return [];
  }
  const data = fs.readFileSync(usersFilePath, "utf8");
  return JSON.parse(data);
}

function writeUsersFile(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf8");
}

class User {
  static getUserByEmail(email) {
    const users = readUsersFile();
    return users.find((user) => user.email === email);
  }

  static createUser(email, password, name) {
    const users = readUsersFile();
    const newUser = { email, password, name };
    users.push(newUser);
    writeUsersFile(users);
    return newUser;
  }

  static updatePassword(email, newPassword) {
    const users = readUsersFile();
    const userIndex = users.findIndex((user) => user.email === email);
    if (userIndex === -1) {
      return null;
    }
    users[userIndex].password = newPassword;
    writeUsersFile(users);
    return users[userIndex];
  }

  static deleteUser(email) {
    let users = readUsersFile();
    users = users.filter((user) => user.email !== email);
    writeUsersFile(users);
    return true;
  }
}

module.exports = User;
