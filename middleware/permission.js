const permit = (role) => {
  let roleId;
  if(role === 'admin') roleId = 2
  if(role === 'user') roleId = 1

  return (req, res, next) => {
    if(req.user.roleId === roleId) {
      next()
    } else {
      res.json({message: 'Sorry, You don\'t have permission'});
    }
  }
}

module.exports = permit