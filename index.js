const express = require('express')
const app = express()
const path = require('path')
const chirps = [];
let chirpID = 1;

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// app.get('/', (req, res)=>{
//     res.render('home.ejs')
// })

app.post('/posts', (req, res)=>{
  const chirp = {id: chirpID++, content:req.body.content}
  chirps.unshift(chirp)
  res.redirect('/')
})

app.get('/', (req, res) =>{
  res.render('home', { chirps })
})






app.listen(8080, ()=>{
    console.log('Listening to 8080')
})