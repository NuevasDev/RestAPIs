const express=require('express');
const router=express.Router();
const Post =require('../models/Employee');
var jwt=require('jsonwebtoken');

//GET All Employee
router.get('/',async(req,res)=>{
    try{
        const emp=await Post.find();
        res.json(emp); 
    }
    catch(err){
        res.json({message:err});
    }
});

//Registration the Employee
router.post('/',async(req,res)=>{
   const post=new Post({
        Name:req.body.Name,
        Email:req.body.Email,
        DOB:req.body.DOB,
        Mobile:req.body.Mobile,
        Password:req.body.Password,
        Gender:req.body.Gender,    
        Address:req.body.Address,
        City:req.body.City,
        State:req.body.State,
        Pincode:req.body.Pincode,
        AadharNo:req.body.AadharNo
   });
   try{
       const savedPost=await post.save();
       res.json(savedPost);

   }
   catch(err){
       res.json({message:err});
   }
});

//Create token
router.post('/api/login',async(req,res)=>{
    const user={id:3};
    const token=jwt.sign({user},'my_secret_key');
    res.json({
        token:token
    });
 });

//Spacific Employee
router.get('/:empId',async(req,res)=>{
    //console.log(req.params.postId);
    try{
    //const post=await Post.findById(req.params.postId);
    const post=await Post.findOne({_id:req.params.empId});
    res.json(post);

   }
   catch(err){
       res.json({message:err});
   }
});

router.get('/login/:Email&:Password',async (req,res)=>{
    console.log(req.params.postId);
    try{
          const pst=await Post.findOne({
            Email:req.params.Email,
              Password:req.params.Password
            },{_id:0,Name:1});
            
            if(pst!=null)
            {
                res.json({
                    "status":"true",
                    "message":"Login Successfully",
                    "data":pst              
                });
            }
            else
            {
                res.json({
                    "status":"true",
                    "message":"Invalid Cridentials",
                    "data":pst
                });
            }
          
         // console.log("get value with multiple parameter");
    }catch(err)
    {
        res.json({message:err});
    }
});

//Spacific Delete Employee
router.delete('/:empId',async(req,res)=>{
    try{
    const removedPost=await Post.remove({_id: req.params.empId});
    res.json(removedPost);

   }
   catch(err){
       res.json({message:err});
   }
});

//Spacific update posts
router.patch('/:empId',async(req,res)=>{
    try{
    const updatedPost=await Post.updateOne(
        {_id: req.params.empId},
        {$set:{Name:req.body.Name}}
        
    );
    res.json(updatedPost);

   }
   catch(err){
       res.json({message:err});
   }
});

module.exports=router;
