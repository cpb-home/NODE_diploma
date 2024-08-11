module.exports = (req, res) => {
  res.render('errors/404', {
    title: 'Ошибка 404'
  })
}