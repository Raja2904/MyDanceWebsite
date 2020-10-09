const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 8000;

//
// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    phone: String,
    email: String,
    form: String,
  });

const contact = mongoose.model('contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// ENDPOINTS
//get requests
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
});
//get requests
app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
});
//post requests
app.post('/contact', (req, res)=>{
   var myData = new contact(req.body);
   myData.save().then(()=>{
       res.send("This item has been saved to the database");
       alert('items saved');
   }).catch(()=>{
       res.status(404).send("Item was not save to the db");
       alert('item not saved');
   })
    // res.status(200).render('contact.pug', myData);
});


app.listen(port, ()=>{
    console.log(`the website is running sucessfully on port ${port}`);
});