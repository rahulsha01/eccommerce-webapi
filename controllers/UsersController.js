const UserObject = require('../models/UsersModel');
const response = require('../services/responseType');
const { bcrypt ,  jwt,  base64,moment,env} = require('../utility/constant')


// const BusinessInfoObject = require('../models/BusinessDetails');

// const UserAddressDetails = require('../models/UserAddress');

module.exports = {
    user_create: async (req, res, next) => {
        const checkUserData = await UserObject.findOne({ $or: [{ email: req.body.email }, { contact: req.body.phoneNumber }] }, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                console.log(result);
            }
        });
        if (checkUserData == null) {
            let user = new UserObject(
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password),
                    phoneNumber: req.body.phoneNumber,
                    city: req.body.city,
                    state: req.body.state,
                    zipCode : req.body.zipCode,
                    country : req.body.country,
                    role: req.body.role,
                    createdAt: moment().format(),
                    modifiedAt: moment().format()
                }
            );
            const userObj = user.save();
            response.getResponseType.DATA = userObj;
            // getNotifiedWithNewUser();
            res.json(response.getResponseType(true, "User Created Successfully", userObj, "", 200));
        } else {
            res.json(response.getResponseType(true, "User already Exits", "", "", 409));
        }
    },
    updateUser: async (req, res, next) => {
        UserObject.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
            if (err) return next(err);
            res.json(response.getResponseType(true ,"Record Update Succesffuly." , req.params.id));
        });
    },
    userLogin: async (req, res, next) => {
        var email = req.body.email;
        const isUserLogin = await UserObject.findOne({ email: email });
        console.log(isUserLogin);
        if (isUserLogin != null) {
            let isLogin = bcrypt.compareSync(req.body.password, isUserLogin.password) ? true : false;
            if (isLogin) {
                const token = jwt.sign({
                    username: req.body.email,
                    password: req.body.password
                },
                    'secretkey', {
                    expiresIn: "1h"
                }
                );
                res.json(response.getResponseType('success', "User Successfully Login", isUserLogin, token, 200));
            } else {
                res.json(response.getResponseType('failed', "Username or Password is wrong! ", [], 204));
            }
        } else {
            res.json(response.getResponseType('failed', "Username or Password is wrong!", [], 204))
        }
    },
    userLogOut: (req, res, next) => {
        // const token = req.headers.authorization.split(" ")[1];
        res.json(response.getResponseType(true, "User successfully logout", []))
    },
    verfiyToken: (req, res, next) => {
        const JWT_BASE64_URL = req.params.token

        // Returns an array of strings separated by the period
        const jwtParts = JWT_BASE64_URL.split('.');
        const headerInBase64UrlFormat = jwtParts[0];
        const payloadInBase64UrlFormat = jwtParts[1];
        const signatureInBase64UrlFormat = jwtParts[2];
        const decodedHeader = base64.decode(headerInBase64UrlFormat);
        const decodedPayload = base64.decode(payloadInBase64UrlFormat);
        const decodedSignature = base64.decode(signatureInBase64UrlFormat);
        console.log(decodedHeader);
        console.log(decodedPayload);
        console.log(decodedSignature);
    },
    create_AddressDetails: async (req, res, next) => {
        let userAddressInfo = new UserAddressDetails(
            {
                userId: req.body.userId,
                state: req.body.state,
                city: req.body.city,
                pinCode: req.body.pinCode,
                addressLine: req.body.addressLine,
                landMark: req.body.landMark,
                isPrimaryAddress: req.body.isPrimaryAddress,
                isPickupAddress: req.body.isPickupAddress,
                isShipingAddress: req.body.isShipingAddress,
                remark: req.body.remark
            }
        );
        const addressInfoObj = await userAddressInfo.save();
        response.getResponseType.DATA = addressInfoObj;
        res.json(response.getResponseType(true, "User Address information added Successfully", addressInfoObj, "", 200));
    },
    getUserFullDetails: async (req, res, next) => {
        const userLoginInfo = await UserObject.find({ _id: req.params.id });
        const userBusinessInfo = await UserAddressDetails.find({ userId: req.params.id });
        const userAddressInfo = await BusinessInfoObject.find({ userId: req.params.id });
        const userFullDetails = [...userLoginInfo, ...userBusinessInfo, ...userAddressInfo];
        res.json(response.getResponseType(true, "User Details", userFullDetails, "", 200));
    },
    getManchineId: async (req, res, next) => {
        // let id = await machineId.machineId();
        const machineIdSync = require('node-machine-id')
        let id = machineIdSync.machineIdSync({ original: true })
        // id = c24b0fe51856497eebb6a2bfcd120247aac0d6334d670bb92e09a00ce8169365
        // let id = machineIdSync({original: true})
        return res.send(id);
    }


}

function getNotifiedWithNewUser() {
    var Pushy = require('pushy');

    // Plug in your Secret API Key 
    // Get it here: https://dashboard.pushy.me/ 
    var pushyAPI = new Pushy(process.env.PUSHYMEKEY);

    // Set push payload data to deliver to device(s) 
    var data = {
        message: 'New User has been register'
    };

    // Insert target device token(s) here 
    var to = ['b0b8fc5b800a6421d8159ee7b98e0d0b4ac6aa7e2828ed06a9d32b78c56fbfa3'];

    // Optionally, send to a publish/subscribe topic instead
    // to = '/topics/news';

    // Set optional push notification options (such as iOS notification fields)
    var options = {
        notification: {
            badge: 1,
            sound: 'ping.aiff',
            body: 'New User has been register \u270c'
        },
    };

    // Send push notification via the Send Notifications API 
    // https://pushy.me/docs/api/send-notifications 
    pushyAPI.sendPushNotification(data, to, options, function (err, id) {
        // Log errors to console 
        if (err) {
            return console.log('Fatal Error', err);
        }

        // Log success 
        console.log('Push sent successfully! (ID: ' + id + ')');
    });
}
