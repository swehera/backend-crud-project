const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/BookListApp')
.then(()=>{
    console.log('Database is Connected')
}).catch((e)=>{
    console.log(e);
    console.log('Database not Connected');
})


const Schema = new mongoose.Schema({
    name: String,
    nameAuthor: String
})

const Bookmodel = mongoose.model('Book', Schema);
module.exports = Bookmodel;




