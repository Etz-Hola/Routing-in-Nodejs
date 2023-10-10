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
// app.use('/', express.static(path.join(__dirname, "public")));
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

// the other  alternative to we can use to get routh paths
//redirect
// app.get('/', (reg, res) => {
//     res.sendFile('/views/index.html', {root: __dirname})
// })
 

//    OR  the other  alternative to we can use to get routh paths

// app.get('/', (reg, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'))
// })


//      OR   the other  alternative to we can use to get routh paths
          //reges is   '^/$|/
// app.get('^/$|/index.html', (reg, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'))
// })


//      OR   the other  alternative to we can use to get routh paths


//  REDIRECT

// app.get('/testing(.html)?', (req, res) => {
//     res.redirect(301, "new-page.html")
// })


//         ALTERNATIVE METHODS
app.get('/ola(.html)?', (req, res) => {
    res.redirect('new-page.html')
})


//Route Handler
app.get('/hello(.html)?', (req, res, next) => {
    console.log('Hum we are moving on')
    next()
}, (req, res) => {
    res.send("Hey Bosses how unah day")
}) 


//CHAINING ROUTE HANDLR

const cohort1 = (req, res, next) => {
    console.log('Kanas Qadir')
    next()
}

const cohort2 = (req, res, next) => {
    console.log('Muhammad Roco')
    next()
}

const cohort3 = (req, res, next) => {
    console.log('Supreme KennyMax')
    next()
}

const cohort4 = (req, res, next) => {
    console.log('Muhammad DadyHaliah')
    res.send('Dem be guru in tech')
}

app.get('/big-devs(.html)?', [cohort1, cohort2, cohort3, cohort4])



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


