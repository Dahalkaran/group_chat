const express=require('express');
const bodyParser=require('body-parser')
const app=express();
const login=require('./login');
const message=require('./mesages')
//const new1=require('./new');
console.log("check");
app.use(bodyParser.urlencoded({extended:false}));
app.use(login);
app.use(message);
//app.use(new1);

app.listen(3000);