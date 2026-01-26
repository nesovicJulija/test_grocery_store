"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.checkUserRole = checkUserRole;
function authenticate(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: "Not authenticated!" });
}
function checkUserRole(user) {
    return function (req, res, next) {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: "Not authenticated!" });
        }
        if (req.user.type !== user) {
            return res.status(403).json({ message: "Access denied!" });
        }
        next();
    };
}
