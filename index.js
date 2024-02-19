const express = require('express')
const Book = require('./database')
const path = require('path');
const { name } = require('ejs');

const app = express()
const port = 3000

// set ejs
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', async(req,res) => {

  const books = await Book.find({})

  res.render('index', {
    title : 'Add Book',
    books: books
  })


})

app.post('/add', async(req,res)=>{
  const {name,nameAuthor} = req.body;
  const newbook = new Book({name,nameAuthor});
  const booksave = await newbook.save();
  res.redirect('/');
})

app.get('/add', (req,res)=> {
  res.render('add');
})


app.get('/edit/:id',async(req,res)=>{
  const {id} = req.params;
  const book = await Book.findById({_id:id});
  if(book==null) {
    res.redirect('/');
  }else {
    res.render('edit', {
      book:book
    })
  }
})


app.post('/update/:id', async(req,res)=>{
  const {id} = req.params;
  const {name, nameAuthor} = req.body;
  const updatebook = await Book.findByIdAndUpdate({_id:id}, {name,nameAuthor},{new:true})
  res.redirect('/');
})



app.get('/delete/:id', async(req,res)=>{
  const {id} = req.params;
  const deletebook = await Book.findByIdAndDelete({_id:id})
  res.redirect('/');
})








app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})