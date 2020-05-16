const express=require('express');
const app=express();
var jwt=require('jsonwebtoken');

//Create token
app.post('/api/login',function(req,res){
    const user={id:3};

    var token=jwt.sign({user},'my_secret_key',{expiresIn: 3600});
    res.json({
        token:token
    });
 });

 app.get('/api/login',ensureToken,function(req,res){
    jwt.verify(req.token,'my_secret_key',function(err,data){
        if(err)
        {
            res.sendStatus(403);
        }
        else
        {
            res.json({
                text:'this is get',
                data:data
            });
        }
    });
    
 });

 function ensureToken(req,res,next)
    {
        const bearerheader=req.headers["authorization"];
        if(typeof bearerheader!=="undefined")
        {
            const bearer=bearerheader.split(" ");
            const bearerToken=bearer[1];
            req.token=bearerToken;
            next();
        }
        else
        {
            res.sendStatus(403);
        }
    }

 app.listen(3003,function(){
     console.log('app is listening on port 3000');
 });