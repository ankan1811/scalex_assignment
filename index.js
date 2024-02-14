const express=require("express");
const app=express();
const dotEnv=require("dotenv");
dotEnv.config();

const bodyparser=require("body-parser");

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({
    useNewUrlParser:true,
    useUnifiedTopology:true,
    extended:true
}));


app.use("/",require("./routes/authRoutes"));

app.listen(process.env.PORT,()=> console.log("Server up and running"));

module.exports=app
