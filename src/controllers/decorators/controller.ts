import 'reflect-metadata'
import {AppRouter} from '../../AppRouter'
import {Methods} from './Methods'
import {MetadataKeys} from './MetadataKeys'
import { Request,Response,RequestHandler, NextFunction } from 'express'

function bodyValidators(keys:string):RequestHandler{
    return (req:Request,res:Response,next:NextFunction)=>{
        if (!req.body){
            res.status(422).send("invalid request");
            return
        }
        for (let key of keys){
            if (!req.body[key]){
                res.status(422).send(`missing property ${key}`)
                return 
            }
        }
        next();
    }
}

export function controller(routePrefix:string){
    return function(target:Function){
        for (let key in target.prototype){
            const routeHandler=target.prototype[key];
            const path=Reflect.getMetadata(MetadataKeys.PATH,target.prototype,key);
            const method:Methods=Reflect.getMetadata(MetadataKeys.METHOD,target.prototype,key);
            const middlewares=Reflect.getMetadata(MetadataKeys.MIDDLEWARE,target.prototype,key)||[];
            const requiredBodyProps=Reflect.getMetadata(MetadataKeys.VALIDATOR,target.prototype,key)||[];

            const validator=bodyValidators(requiredBodyProps)
            if (path){
                console.log("render")
                AppRouter.getInstance()[method](`${routePrefix}${path}`,...middlewares,validator,routeHandler)
            }
            
        }
    }
}