require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const {rateLimit} = require('express-rate-limit')
const cors = require("cors");
const { connect } = require("./db")
const movieRoutes = require("./routes/movie");
const authorizeMiddleware = async(req, res, next) => {
    if(req.method === "GET") {
        next();
    } else {
        if(req?.headers["authorization"]?.split(" ")?.[1] === process.env.TOKEN ) next()
        else res.status(400).json({message: "not allowed"})
    }
}

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	limit: 100, 
	standardHeaders: 'draft-8',
	legacyHeaders: false,
    message: { message: "Too many requests" },
})

const port = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(limiter)

app.use("/api/movies/", authorizeMiddleware, movieRoutes);
app.use("/", (req, res) => {
    res.status(400).json({message: "Bad Request"});
})
connect().then(() => {
    app.listen(port, (req, res) => {
        console.log(`Server connected to port ${port}`);
    })  
});
