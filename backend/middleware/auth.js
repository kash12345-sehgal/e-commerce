import jwt from 'jsonwebtoken'

const authuser = async (req,res,next)=>{
    const token = req.header('token')
    if(!token){
        return res.json({success:false,message:"Unauthorized Login again"})
    }   
    try {
        const token_decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId = token_decoded.userId
        
        next()
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message})
    }
}

export default authuser;