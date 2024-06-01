import mongoose from "mongoose";
import dotenv from "dotenv" ;

dotenv.config() ;

const connection = async() => {
    const MONGO_URL = process.env.MONGO_URL ;

    await mongoose.connect(MONGO_URL, {}).then((res) => {
        console.log("DataBase Connected Successfully") ;
    }).catch((err) => {
        console.log(err) ;
    })

}

export default connection ; 