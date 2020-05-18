import express from 'express';

export class AppRouter{
    private static instance:express.Router;
    static getInstance():express.Router{
        console.log("create router")
        if (!AppRouter.instance){
            AppRouter.instance=express.Router()

        }
        return AppRouter.instance;
    }
}