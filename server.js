import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

// db and authenticateUser
import connectDB from './db/connect.js'

//routers
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

//middleware
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'
import authenticateUSer from './middleware/auth.js'

if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}

app.use(cors())

const __dirname = dirname(fileURLToPath(import.meta.url));
// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

app.get('/',(req,res)=>{
    res.json( {msg:'Welcome!'} )
})

app.get('/api/v1',(req,res)=>{
    res.json( {msg:'API!'} )
})

// mount the router on the app
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authenticateUSer,jobsRouter)

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port,()=>{
            console.log(`server is listening on port ${port}...`)
        })

    } catch (error) {
        console.log(error)
    }
}

start()