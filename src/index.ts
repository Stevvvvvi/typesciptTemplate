import express from 'express';
import bodyParser from 'body-parser';
import {AppRouter} from './AppRouter'
import './controllers/LoginController'
import cookieSession from 'cookie-session';

const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieSession({keys:['asdfasdfasdfsadf']}))
app.use(AppRouter.getInstance())
app.listen(3000,()=>{
    console.log('listening on 3000')
})