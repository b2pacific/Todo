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
        unique: true,
        validate: {
            validator: function (value) {
                const self = this;
                const errorMsg = 'Email already in use!';
                return new Promise((resolve, reject) => {
                    self.constructor.findOne({
                            email: value
                        })
                        .then(model => model._id ? reject(new Error(errorMsg)) : resolve(true)) // if _id found then email already in use 
                        .catch(err => resolve(true)) // make sure to check for db errors here
                });
            },
        }
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