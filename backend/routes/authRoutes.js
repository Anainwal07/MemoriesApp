import express from "express" ; 
import { LoginControllers  , SignupControllers} from "../contollers/authcontrollers.js";

const router = express.Router() ; 

router.post("/login" , LoginControllers)  ;
router.post("/signup" , SignupControllers) ; 

export default router ; 