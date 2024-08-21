const express=require('express');
const routs=express.Router();

routs.get('/login',(req,res,next)=>{
   
res.send(`
    <form action="/" method="POST" onsubmit="storage()">
    <input type="text" name="title" id="username" >
    <button type="submit" >Login</button>
    </form>
    <script>
    function storage(){
    const username=document.getElementById('username').value;
   localStorage.setItem('username', username);
    }
    </script>
    `)
   
});
/*routs.post('/', (req, res, next) => {
    res.redirect('/')
});*/

module.exports=routs;