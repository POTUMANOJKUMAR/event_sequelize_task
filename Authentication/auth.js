const jwt=require("jsonwebtoken")
function verifyToken(req,res,next){
    const token=req.headers.authorization;
    if(!token)
    return res.status(403).json({message:`token not found`})


    jwt.verify(token,'123456',(err,decoded)=>{
    if(err){

    return res.status(403).json({massage:`Failed to authenticate token`})}
    req.email=decoded;
console.log(req.email)
    next();
    })}
    module.exports=verifyToken
