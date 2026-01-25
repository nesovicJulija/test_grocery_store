import express from "express";
import passport from "passport";

const router = express.Router()

// login
router.post("/login", (req, res, next) => {
    passport.authenticate("local-login", (err: any, user: any, info: { message: any; }) => {
        if(err){
            return next(err);
        }

        if(!user){
            return res.status(401).json({message : info.message})
        }

        req.logIn(user, (err) => {
            if(err){
                return next(err);
            }

            return res.json({message : "Logged in!", user})
        })
    })(req, res, next);
})

//logout
router.post("/logout", (req, res, next) => {
    req.logOut((err) => {
        if(err){
            return next(err);
        }

        res.json({message : "Logged out !"})
    })
})

export default router;