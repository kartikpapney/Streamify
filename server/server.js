require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;

const movieRoutes = require("./routes/movie");
const app = express();
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors({
    origin: `*`
}));

app.use("/api/movies/", movieRoutes);

app.listen(port, (req, res) => {
    console.log(`Server connected to port ${port}`);
})