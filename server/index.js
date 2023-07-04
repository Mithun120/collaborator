let express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser');
const dotenv=require('dotenv')
// dotenv.config();
const api = require('../server/routes/user.routes')
const dapi=require('../server/routes/domain.routes')
const emailRoutes = require("./routes/emailRoute");
const clientRoutes=require("./routes/ourclients")
const blogRoutes=require("./routes/blogroutes");
const cookieParser = require('cookie-parser');
const authRoutes=require("./routes/auth")
// const link="mongodb+srv://voxsystem:voxsystem123@voxsystem.abqxgtp.mongodb.net/"
// MongoDB Configuration
const link="mongodb+srv://multer:multer123@cluster0.nfwb7gb.mongodb.net/"
const JWT="eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY3NTg2NTEwOCwiaWF0IjoxNjc1ODY1MTA4fQ.3yUi0GJAK_oOB8CoVigMJrNSIZR7NCUw3GFGCfYP3Lk"

mongoose
  .connect(link)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));   
app.use(cors());
app.use(cookieParser());
app.use("/auth",authRoutes)
app.use('/public', express.static('public'));
app.use('/api', api)
app.use('/dapi',dapi);
app.use("/api/email", emailRoutes);
app.use("/clientapi",clientRoutes)
app.use("/blog",blogRoutes)

const port =  4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})
app.use((req, res, next) => {
    // Error goes via `next()` method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
}); 