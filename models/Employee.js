const mongoose=require('mongoose');

const PostSchema=mongoose.Schema({

    Name:{
        type:String,
        require:'Name is require'        
    },
    Email:{
        type:String,
        require:'Email is require',
        unique:true,
        lowercase: true, // Always convert `test` to lowercase
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    DOB:{
        type:Date
    },
    Mobile:{
        Mobile1:{
            type:Number,
            require:'First Mobile is require',
            unique:true
        },
        Mobile2:{
            type:Number,
            unique:true
        }
    },
    Password:{
        type:String,
        require:'Password is require',
        minlength:8
    },
    Gender:{
        type:String,
        require:'Gender is require'
    },
    
    Address:{
        
        Local_Address:{
            type:String,
            require:'Local Address is require'
        },    
        Current_Address:{
                type:String
        }      
        
    },
    City:{
        type:String,
        require:'City Name is require'
    },
    State:{
        type:String,
        require:'State Name is require'
    },
    Pincode:{
        type:Number,
        require:'Pincode is require'
    },
    AadharNo:{
        type:String,
        require:'Aadhar Number is require',
        unique:true
    }
    
});
module.exports=mongoose.model('employee',PostSchema);