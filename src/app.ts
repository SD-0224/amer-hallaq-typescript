import express, { Request, Response, Application } from 'express';
import ejs from "ejs";
import morgan from "morgan";
import path from "path";
import imageRoutes from "./routes/imageRoutes"

console.log("111")
const app: Application = express();
// Use morgan middleware with the "combined" format
app.use(morgan('dev'));

// To access Bootstrap Files
app.use('/',express.static("./node_modules/bootstrap/dist/"));
// To access static files 
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use(express.static(path.join(__dirname,'public')));

// register view engine - it checks views folder by default
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Data coming from HTML forms
app.use(express.urlencoded({ extended: true }));

// Data coming as JSON - POSTMAN for instace 
app.use(express.json());


//use routes in the routes folder
app.use(imageRoutes);

//If route does not exist, redirect to the root
app.use((req:Request,res:Response,err:any) => {
    console.log(err)
    res.redirect('/')
});

export default app;