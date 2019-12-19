module.exports = (req, res, next) => {
  console.log(req.session.isloggedIn)
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  next()
}