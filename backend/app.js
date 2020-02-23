const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const productRouter = require('./routes/productRouter');
const helmet = require('helmet');
const compression = require('compression');
const express = require('express');
const path = require('path');
const app = express();

// app.get(('/'), (req, res, next) => {
//  res.send('Hello buddy');
// });
mongoose.connect(
  "mongodb+srv://debankurdas:"+process.env.MONGO_ATLAS_PW+
  "@cluster0-nvn0n.mongodb.net/medico?retryWrites=true&w=majority",
{ useNewUrlParser: true,useUnifiedTopology: true  })
.then(()=>{
  console.log("Connected to database");
})
.catch(() => {
  console.log("Connection error");
})
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use("/images", express.static(path.join('backend/images')));
app.use((req,res,next)=>
{
  res.setHeader(
    'Access-Control-Allow-Origin','*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    "Origin, X-Requested-With,Content-Type,Accept,Authorization"
    );
  res.setHeader(
    'Access-Control-Allow-Methods',
    "GET,POST,PATCH,PUT,DELETE,OPTIONS"
    );
    next();
})

app.use('/api/users', userRouter);
app.use('/api/categories',categoryRouter);
app.use('/api/products',productRouter);
module.exports = app;
