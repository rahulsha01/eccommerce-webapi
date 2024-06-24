const {router} = require('../utility/constant')
var verifyToken = require('../services/auth');
// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/UsersController');

// a simple test url to check that all of our files are communicating correctly.
router.post('/create',  user_controller.user_create);
router.put('/:id/update', verifyToken , user_controller.updateUser);
// router.post('/addUserDetails', verifyToken , user_controller.create_bussinessDetails);
router.post('/addUserAddress', verifyToken, user_controller.create_AddressDetails);
router.get('/getUserDetails/:id', verifyToken, user_controller.getUserFullDetails);
router.get('/machineId', user_controller.getManchineId);
router.post('/login', user_controller.userLogin);
router.get('/logout',verifyToken , user_controller.userLogOut);
router.get('/auth/:token', user_controller.verfiyToken);
// router.post('/userBusinessInfo', verifyToken , user_controller.create_bussinessDetails)
// router.post('/forgotPassword',user_controller.)
// router.get('/payment', user_controller);
// router.get('/getAllProduct', product_controller.getAllProduct);
// router.put('/:id/update', product_controller.updateProduct);
// router.delete('/:id/delete', product_controller.deleteProduct);
module.exports = router;