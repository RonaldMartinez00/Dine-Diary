require('dotenv').config()
const dotenv = require('dotenv')
const express = require('express')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./controllers/user");
const app = express();
const port = process.env.PORT;
const uri = process.env.MONGO_URI;
const mealRoutes = require("./controllers/meals");
const cors = require('cors');
const { METHODS } = require('http');



var corsOptions= {
origin:'https://dine-diaryfe.herokuapp.com',
methods:"GET, POST, DELETE, PUT",
changeOrigin:true, 
credentials:true
};
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(express.static('public'))

/*mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to MongoDB!");
});*/

app.options('*',cors());
app.use("/", userRoutes);
app.use("/meals",mealRoutes);
app.use("/auth",require('./controllers/auth'))
// Start the server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening on port ${process.env.PORT || 5000}`);
});
