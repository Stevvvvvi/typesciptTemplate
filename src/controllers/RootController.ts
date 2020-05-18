import {Request,Response, NextFunction} from 'express'
import {get,controller,use} from './decorators'

function requireAuth(req:Request,res:Response,next:NextFunction){
    if (req.session&&req.session.loggedIn){
        next();
        return
    }
}

@controller('')
class RootController{
    @get('/')
    getRoot(req:Request,res:Response){
        if (req.session&& req.session.loggedIn){
            res.send(`
                <div>
                    <div>You are logged in </div>
                    <a href="/auth/logout">Logout</a>
                </div>
            `)
        }else{
            res.send(`
                <div>
                    <div>You are not logged in </div>
                    <a href="/auth/login">Login</a>
                </div>
            `)
        }
    }

    @get('/protected')
    @use(requireAuth)
    getProtected(req:Request,res:Response){
        res.send("welcome to protected route, logged in user")
    }
}