var express = require('express');
const { home, printCertificate } = require('../controllers/certificate');
var router = express.Router();

/* GET home page. */
// router.get('/', home);
router.get('/', (req, res) => {
    res.render('upload');
});
router.get('/print', printCertificate);

module.exports = router;
