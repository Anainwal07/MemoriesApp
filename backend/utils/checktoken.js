import jwt from "jsonwebtoken" ; 
import dotenv from "dotenv" ; 

dotenv.config() ; 

const checktoken = async(req , res, next) => {

    let token = req.headers.authorization ; 
    
    //if token is present
    if(!token){
        return res.status(401).json({
            message : "Unauthorized!" ,
        });
    }

    //if token is valid 
    try {
        token = token.split(" ")[1] ;
        
        const decodedToken = jwt.verify(token , process.env.JWT_SECRET) ; 
        
        req.user_id = decodedToken.user_id ;
    
        next() ; 

    } catch (error) {
        return res.status(401).json({
            message : "Unauthorized!", 
        }) ; 
    }
}

export default checktoken ; 