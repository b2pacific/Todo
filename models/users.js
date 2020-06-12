const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Tasks = require("./tasks");
const bcrypt = require("bcrypt");
const saltRounds = 2;
const jwt = require("jsonwebtoken");

const usersSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    task: [Tasks.taskSchem],
    token: {
        type: String
    }
});

usersSchema.pre("save", function (next) {
    var user = this;

    if (user.isModified("password")) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err)
                next(err);
            else {
                bcrypt.hash(user.password, salt, function (err, hash) {
                    if (err)
                        return next(err);
                    else {
                        user.password = hash;
                        next();
                    }
                })
            }
        })
    } else {
        next();
    }

})

usersSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err)
            return cb(err);
        else {
            return cb(null, isMatch);
        }
    })
}

usersSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), "secret");

    user.token = token;
    user.save(function (err, user) {
        if (err)
            return cb(err);
        else {
            return cb(null, user);
        }
    })
}

usersSchema.statics.findByToken = function (token, cb) {
    var User = this;

    jwt.verify(token, "secret", function (err, decode) {
        User.findOne({
            "_id": decode,
            "token": token
        }, function (err, user) {
            if (err)
                return cb(err);
            else
                return cb(null, user);
        })
    })
}

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;