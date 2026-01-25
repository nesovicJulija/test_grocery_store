import async from "async";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

var checkLogin = function (req : any, sEmail : string, sPassword : string, done : any, userRepo : any){
    async.waterfall(
        [
            function(callback : any){
                if(req.body){
                    userRepo.findByEmail(sEmail)
                    .then((user: any) => {
                        
                        callback(null, user);
                    })
                    .catch((err : any) => callback(err));
                }else{
                    return callback(null, null);
                }
            },
            function(user : any, callback : any){
                if(!user){
                    return callback(null, null)
                }

                bcrypt.compare(sPassword, user.password)
                      .then((isValid : boolean) => {
                        if(!isValid){
                            return callback(null, null);
                        }

                        callback(null, user);
                      })
                      .catch((err : any) => callback(err))
            }
        ],
        function (err, user){
            if(err){
                return done(err);
            }

            if(!user){
                return done(null, false, { message : "Invalid email or password!" })
            }

            return done(null, user);
        }
    )
}

export function configurePassport(userRepo : any){
    passport.use('local-login', new LocalStrategy(
        {
            usernameField : "email",
            passwordField : "password",
            passReqToCallback : true    
        },
        function (req, email, password, done){
            checkLogin(req, email, password, done, userRepo);
        }
    ))

    // serialize user
    passport.serializeUser(function (user : any, done){
        done(null, user._id);
    })    

    // deserialize user
    passport.deserializeUser(async function (id, done){
        try{
            const user = await userRepo.findById(id);
            done(null, user);
        }catch(err){
            done(err);
        }
    })
}
