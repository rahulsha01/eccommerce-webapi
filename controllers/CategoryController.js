const CategoryObject = require('../models/CategoryModel');
const {bcrypt ,  jwt,  base64,moment,env , MUUID} = require('../utility/constant')
const response = require('../services/responseType');
module.exports = {
    category_create: async (req, res, next) => {
        console.log(req.body);
        const checkData = await CategoryObject.findOne({category_name: req.body.category_name} ,  function (err, result) {
            if (err) {
                res.send(err);
            } else {
                console.log(result);
            }
        });
        console.log(checkData);
        if (checkData == null) {
            let data = new CategoryObject(
                {
                    category_id: MUUID.v4(),
                    category_name: req.body.category_name,
                    category_desc: req.body.category_desc,
                    createdAt: moment().format(),
                    modifiedAt: moment().format()
                }
            );
            console.log(data);
            const dataObj = data.save();
            response.getResponseType.DATA = dataObj;
            // getNotifiedWithNewUser();
            res.json(response.getResponseType(true, "Data Created Successfully", dataObj, "", 200));
        } else {
            res.json(response.getResponseType(true, "Data already Exits", "", "", 409));
        }
    },
    updateCategory: async (req, res, next) => {
        CategoryObject.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
            if (err) return next(err);
            res.json(response.getResponseType(true ,"Record Update Succesffuly." , req.params.id));
        });
    },
    deleteCategory : (req , res , next) => {
        CategoryObject.findByIdAndDelete(req.params.id , function (err) {
            if (err) 
            return res.status(500).json(response.getResponseType(true ,"ID does not exits" , req.params.id))
            res.json(response.getResponseType(true ,"Record Deleted Successfully." , req.params.id));
        })
    },
    getAllCategory: async (req , res , next) => {
        const allCategory = await CategoryObject.find({});
        res.json(response.getResponseType(true ,"" , allCategory));
    },
}