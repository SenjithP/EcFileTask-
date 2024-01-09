import express from "express";
import dotenv from "dotenv";
import { connect } from "./Config/mongoDBConfig.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userAuthenticationRouter from "./Routes/userAuthenticationRouter.js";
import adminAuthenticationRouter from "./Routes/adminAuthenticationRouter.js";
import morgan from "morgan";
import compression from "compression";
import userRouter from "./Routes/userRouter.js";
import cloudinary from "cloudinary";
import path from "path"
import adminRouter from "./Routes/adminRouter.js";
const currentWorkingDir = path.resolve();
const parentDir = path.dirname(currentWorkingDir)


dotenv.config();
const app = express();

//Image Upload
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDAPISECERET,
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true }));
app.use(express.static("Public"));
app.use(compression());
app.use(morgan("dev"));

// Routes
app.use("/api/userAuthentication", userAuthenticationRouter);
app.use("/api/users", userRouter);
app.use("/api/adminAuthentication", adminAuthenticationRouter);
app.use("/api/admin", adminRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});



const enviornment = "production"

if (enviornment === 'production') { 
    const __dirname = path.resolve();
    app.use(express.static(path.join(parentDir, '/Client/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(parentDir, 'Client', 'dist', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }



// MongoDB connection
connect();



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend server started successfully, http://localhost:${port}`);
});
