import {AppRouter} from '../AppRouter'
import {Request, Response, NextFunction, request} from 'express'
import {get,controller,use,bodyValidator, post} from './decorators'

// function logger(req:Request,res:Response,next:NextFunction){
//     console.log("request was made!!!")
//     next();
// }

@controller('/auth')
class LoginController{
    @get('/login')
    //@use(logger)
    getLogin(req:Request,res:Response):void{
        res.send(`
            <form method="POST">
                <div>
                    <label>Email</label>
                    <input name="email" />
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" />
                </div>
                <button>Submit</button>
            </form>
        `)
    }

    @post('/login')
    @bodyValidator('email','password')
    postLogin(req:Request,res:Response){
        const {email,password}=req.body;

        if (email==='123@.com'&&password==='123'){
            req.session={loggedIn:true};
            res.redirect('/');
        }else{
            res.send('invalid emial or password')
        }
    }

    @get('/logout')
    getLogout(req:Request,res:Response){
        req.session=undefined;
        res.redirect('/')
    }
}

