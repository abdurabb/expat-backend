const express = require("express")
const app = express()
const http = require('http');
const connectDB = require("./connection/mongoConnection")
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require("dotenv")
const bodyParser = require("body-parser");
const path = require("path")
app.set('trust proxy', true);
const { green } = require("colors")
dotenv.config({ path: "/.env" })
app.use(bodyParser.json({ limit: "1000mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev") || morgan("combined"));
app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ extended: true, limit: '1000mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB()


const hostName = process.env.HOST_NAME || "localhost";
const port = process.env.PORT || 3000;
const server = http.createServer(app);


app.use('/course', require('./routes/courseRoute'))


server.listen(port, () => {
    console.log(`Server running at ${hostName}:${port}`.green);
});