const jwt=require('jsonwebtoken');
require('dotenv').config();

const verifytoken=(req,res,next)=>{
    const token=req.headers['x-auth-token'];
    if(!token){
        res.status(403).json({message:'token not provided'})
    }
    else{
        jwt.verify(
            token,
            process.env.JWT_SECRET,
            (err,payload)=>{
                if(err){
                    console.log(err);
                    res.status(500).json(err)
                }
                else{
                    req.user=payload;
                    next();
                }

            }

        )
    }

}

module.exports=verifytoken;