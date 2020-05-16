const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
require('dotenv/config');
const cors=require('cors');

//Middelwares
app.use(cors());
app.use(bodyParser.json());
// Import Route
const postsRoute=require('./route/posts');
const employeeRoute=require('./route/employee');

app.use('/posts',postsRoute);
app.use('/employee',employeeRoute);

//Route
app.get('/',(req,res)=>{
    res.send('we are on home');
});


//Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
{useNameUrlParser:true},
()=> console.log('Connect to DB')
);



//start listening to the server
app.listen(8000);

