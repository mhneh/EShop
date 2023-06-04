'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const models = require('../models');

// hàm này sẽ được gọi xác thực thành công và lưu thông tin user vào session
passport.serializeUser((user, done) => {
    done(null, user.id);
});


// hàm được gọi bởi passport.session để lấy thông tin của user từ csdl và đưa vào req.user
passport.deserializeUser(async (id, done) => {
    try {
        let user = await models.User.findOne({
            attributes: ['id', 'email', 'firstName', 'lastName', 'mobile', 'isAdmin'],
            where: { id }
        });
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});


// hàm xác thực người dùng khi đăng nhập
passport.use('local-login', new LocalStrategy({
    usernameField: 'email', // tên đăng nhập là email
    passwordField: 'password',
    passReqToCallback: true // cho phép truyền req vào callback để kiểm tra user đã đăng nhập chưa
}, async (req, email, password, done) => {
    if (email) {
        email = email.toLowerCase();
    }
    try {
        if (!req.user) { // nếu user chưa đăng nhập
            let user = await models.User.findOne({ where: { email } });
            if (!user) { // email k tồn tại
                return done(null, false, req.flash('loginMessage', 'Email does not exist!'));
            }
            if (!bcrypt.compareSync(password, user.password)) { // nếu mật khẩu không đúng
                return done(null, false, req.flash('loginMessage', 'Invalid password!'));
            }
            // cho phép đăng nhập 
            done(null, user);
        }
        // ngược lại thì bỏ qua đăng nhập
        done(null, req.user);
    } catch (error) {
        done(error);
    }
}));


// hàm đăng ký tài khoản
passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    if (email) {
        email = email.toLowerCase();
    }
    if (req.user) { // neu nguoi dung da dang nhap thi bo qua
        return done(null, req.user);
    }
    try {
        let user = await models.User.findOne({ where: { email } });
        if (user) {
            return done(null, false, req.flash('registerMessage', 'Email already taken!'));
        }
        user = await models.User.create({
            email: email,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(8)),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobile: req.body.mobile
        });

        // thong bao dang ky thanh cong
        done(null, false, req.flash('registerMessage', 'You have registered successfully. Please login!'));
    } catch (error) {

    }
}));

module.exports = passport;