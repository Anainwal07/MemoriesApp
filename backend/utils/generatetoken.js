import jwt from "jsonwebtoken" ; 
import dotenv from "dotenv" ;

dotenv.config() ; 

const generatetoken = (user_id) => {
    const token = jwt.sign(
        {user_id} ,
        process.env.JWT_SECRET , 
        {expiresIn: '1d'}
    ) ;

    return token ; 
}

export default generatetoken ;