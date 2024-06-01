import User from "../models/UserSchema.js";
import bcrypt from "bcrypt" ;  
import generatetoken from "../utils/generatetoken.js";

export const LoginControllers = async(req , res) => {
    try {
        const {username , password} = req.body ; 

        if(!username || !password){
            return res.status(400).json({message : "Provide all fields"}); 
        }

        const user  = await User.findOne({username}) ;

		if (!user) {
			return res.status(400).json({ error: "Invalid username " });
		}

        const hash = user.password ; 
        const isMatch = bcrypt.compareSync(password, hash) ; 

        if(!isMatch){
            return res.status(400).json({message : "Invalid password"});
        }
        

        res.status(200).json({
            message : "Login Successfull" ,
            user ,
            token : generatetoken(user._id)
		});
    } 
    catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const SignupControllers = async(req , res) => {
    try {
        const {name , username , password , picturePath} =  req.body ;

        if(!name || !username || !password){
            return res.status(400).json({message : "Provide all necessary fields"}); 
        }
        const userName = await User.findOne({username});
        
        if(userName){
            return res.status(400).json({message : "UserName already exists"}) 
        }

        const saltRounds = 10  ; 
        const salt = bcrypt.genSaltSync(saltRounds) ;
        const encryptedPassword = bcrypt.hashSync(password , salt) ;

        const user  = await User.create({
            name , 
            username , 
            password : encryptedPassword ,
            picturePath ,
        }) ; 

        return res.status(200).json({
            message: "User registered successfully", 
            user : user , 
            token : generatetoken(user._id)
        }); 

    } catch (error) {
        return res.status(500).json({message: "Error in registering user"}) ;
    }
}
  
