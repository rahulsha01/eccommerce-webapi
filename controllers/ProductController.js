const ProductObject = require('../models/ProductModel');
const {moment , MUUID} = require('../utility/constant')
const response = require('../services/responseType');
const uploadFile = require('../utility/upload')
module.exports = {
    category_create: async (req, res, next) => {
        console.log(req.body);
        const checkData = await ProductObject.findOne({productName: req.body.productName} ,  function (err, result) {
            if (err) {
                res.send(err);
            } else {
                console.log(result);
            }
        });
        console.log(checkData);
        if (checkData == null) {
            let data = new ProductObject(
                {

                    productName: req.body.productName,
                    product_id: MUUID.v4(),
                    productDescription: req.body.productDescription,
                    procutPrice: req.body.procutPrice,
                    productStockQuantity: req.body.productStockQuantity,
                    category_id: req.body.category_id,
                    productImagesUrl: req.body.productImagesUrl,
                    productCreatedAt: moment().format(),
                    procutModifiedAt: moment().format()
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
    updateProduct: async (req, res, next) => {
        ProductObject.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
            if (err) return next(err);
            res.json(response.getResponseType(true ,"Record Update Succesffuly." , req.params.id));
        });
    },
    deleteProduct : (req , res , next) => {
        ProductObject.findByIdAndDelete(req.params.id , function (err) {
            if (err) 
            return res.status(500).json(response.getResponseType(true ,"ID does not exits" , req.params.id))
            res.json(response.getResponseType(true ,"Record Deleted Successfully." , req.params.id));
        })
    },
    getAllCategory: async (req , res , next) => {
        const allCategory = await ProductObject.find({});
        res.json(response.getResponseType(true ,"" , allCategory));
    },
}

function uploadImages(file) {
    
}