const  express = require('express');
const colors = require('colors');
const dotenv = require("dotenv").config();
const app = express();
const errorHandler = require("./middleware/errorHandler");
const connectDB = require('./config/dbConnection');
const cors = require('cors');
connectDB();
const PORT  = process.env.PORT||5000;


app.use(cors());
app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`.bgMagenta.white);
})