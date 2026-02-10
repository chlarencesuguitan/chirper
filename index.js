const express = require('express')
const app = express()
const path = require('path')
const {v4:uuid} = require('uuid');
const chirps = [];


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.post('/posts', (req, res)=> {
  if(!req.body.content?.trim()){
    return res.redirect('/');
  }
  const chirp = {id: uuid(), content:req.body.content};
  chirps.unshift(chirp);//push is like parang comment 
  res.redirect('/')
})

app.get('/posts/:id', (req, res)=>{
  const { id } = req.params
  const chirp = chirps.find(c => c.id === id);
  if (!chirp) return res.redirect('/');
  res.render('view', { chirp })
})






app.get('/', (req, res) =>{
  res.render('home', { chirps })
})


app.listen(8080, ()=>{
    console.log('Listening to 8080')
})