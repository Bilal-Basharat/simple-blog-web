const express = require('express');
const router = express.Router();
const multer = require('multer');
const {connection} = require('../database/sql');

var storage = multer.diskStorage({

    destination:function(request,file,cb){
        cb(null,"./public/images/");

    },
    filename:function(request,file,cb){
        cb(null,Date.now()+file.originalname);
    }

});

var upload = multer({storage});

var multiUpload = upload.fields([{name:'profilePic'}]);

router.post('/',multiUpload,(req,res,next) => {

    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const file1 = req.files.profilePic[0].filename
    // const file2 = req.files.image[0].filename
    console.log(fName);
    console.log(lName);
    console.log(email);
    console.log(password);
    console.log(file1);

    const data = {
        fName: fName,
        lName: lName,
        email: email,
        password: password,
        image: file1,
    }
    connection.query('INSERT into newRegistration SET ?',data,(err,result) => {
        if(err) throw err;
        else{
            console.log('data stored');
            res.redirect('http://localhost:3000');
        }
    })

});

module.exports = router;