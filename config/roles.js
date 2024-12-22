const allRoles = {
  user: ['getTodos', 'getTodo', 'createTodo', 'updateTodo', 'toggleCompleted', 'deleteTodo'],
  admin: ['manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
