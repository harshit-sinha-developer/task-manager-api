const router = require('express').Router();
const taskRoutes = require('./api/modules/task/task.routes');
const userRoutes = require('./api/modules/user/user.routes');

router.use('/task', taskRoutes);
router.use('/user', userRoutes);

router.use('*', function (req, res) {
    res.status(404).json({ message: "Bad path" });
})
module.exports = router;