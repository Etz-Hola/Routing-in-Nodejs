const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errHandler');
const PORT = process.env.Port || 4100

//buiting in 
app.use(express.urlencoded({extended: false}))
app.use(express.json());

//static ROUTES
app.use('/', require('./routes/root.js'))
app.use('/subdir', require('./routes/subdir'))
app.use('/employees', require('./routes/api/employees.js'))


app.use('/', express.static(path.join(__dirname, "public")));
// app.use('/subdir', express.static(path.join(__dirname, '/public')));


app.use(logger)

const whitelist = ['https://www.yourdomain.com', 
    'http://127.0.0.1:5500', 
    'http://localhost:3000']

const corsOptions = {
    origin:(origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin) { 
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));






//app.all is the route handler for all requests
app.all('/*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accept('json')) {
        res.json({error: '404 Not found' });
    }else {
        res.type('txt').send('404 Not found')
    }
})


app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})


