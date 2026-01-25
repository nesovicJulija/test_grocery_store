"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurePassport = configurePassport;
const async_1 = __importDefault(require("async"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
var checkLogin = function (req, sEmail, sPassword, done, userRepo) {
    async_1.default.waterfall([
        function (callback) {
            if (req.body) {
                userRepo.findByEmail(sEmail)
                    .then((user) => {
                    callback(null, user);
                })
                    .catch((err) => callback(err));
            }
            else {
                return callback(null, null);
            }
        },
        function (user, callback) {
            if (!user) {
                return callback(null, null);
            }
            bcrypt_1.default.compare(sPassword, user.password)
                .then((isValid) => {
                if (!isValid) {
                    return callback(null, null);
                }
                callback(null, user);
            })
                .catch((err) => callback(err));
        }
    ], function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: "Invalid email or password!" });
        }
        return done(null, user);
    });
};
function configurePassport(userRepo) {
    passport_1.default.use('local-login', new passport_local_1.Strategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, function (req, email, password, done) {
        checkLogin(req, email, password, done, userRepo);
    }));
    // serialize user
    passport_1.default.serializeUser(function (user, done) {
        done(null, user._id);
    });
    // deserialize user
    passport_1.default.deserializeUser(async function (id, done) {
        try {
            const user = await userRepo.findById(id);
            done(null, user);
        }
        catch (err) {
            done(err);
        }
    });
}
