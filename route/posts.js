const express=require('express');
const router=express.Router();
const Post =require('../models/Post');

//GET posts
router.get('/',async(req,res)=>{
    //res.send('we are on posts');
    try{
        const posts=await Post.find();
        res.json(posts);
 
    }
    catch(err){
        res.json({message:err});
    }
});

//Submit the posts
router.post('/',async(req,res)=>{
   //console.log(req.body);
   const post=new Post({
       title:req.body.title,
       description:req.body.description
   });
   try{
       const savedPost=await post.save();
       res.json(savedPost);

   }
   catch(err){
       res.json({message:err});
   }
//    post.save()
//    .then(data=>{
//     res.json(data);
//    }).catch(err=>{
//        res.json({
//            message:err
//        });
//    });
});

//Spacific posts
router.get('/:postId',async(req,res)=>{
    //console.log(req.params.postId);
    try{
    //const post=await Post.findById(req.params.postId);
    const post=await Post.findOne({title:req.params.postId});
    res.json(post);

   }
   catch(err){
       res.json({message:err});
   }
});

router.get('/:postId&:title',async (req,res)=>{
    console.log(req.params.postId);
    try{
          const pst=await Post.findOne({
              _id:req.params.postId,
              title:req.params.title
            });
          res.json(pst)
          console.log("get value with multiple parameter");
    }catch(err)
    {
        res.json({message:err});
    }
    

    });

//Spacific Delete posts
router.delete('/:postId',async(req,res)=>{
    try{
    const removedPost=await Post.remove({_id: req.params.postId});
    res.json(removedPost);

   }
   catch(err){
       res.json({message:err});
   }
});

//Spacific update posts
router.patch('/:postId',async(req,res)=>{
    try{
    const updatedPost=await Post.updateOne(
        {_id: req.params.postId},
        {$set:{title:req.body.title}}
        
    );
    res.json(updatedPost);

   }
   catch(err){
       res.json({message:err});
   }
});

module.exports=router;
