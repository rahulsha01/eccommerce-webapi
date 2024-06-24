const {router} = require('../utility/constant')
var verifyToken = require('../services/auth');
let category_controller = require('../controllers/CategoryController')

router.get('/getCategory', verifyToken , category_controller.getAllCategory )
router.post('/createCategory', verifyToken ,   category_controller.category_create);
router.put('/:id/update', verifyToken , category_controller.updateCategory);
router.delete('/:id/delete', verifyToken , category_controller.deleteCategory);


module.exports = router;