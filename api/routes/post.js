const express = require('express');
const router = express.Router();
const multer = require('multer')
const {connection} = require('../database/sql');

var storage = multer.diskStorage({

    destination:function(request,file,cb){
        cb(null,'./public/blogImages/');
    },

    filename:function(request,file,cb){
        cb(null,Date.now()+file.originalname);
    }
})

var upload = multer({storage});
const multiUpload = upload.fields([{name:'blogImage'}])

router.post('/',multiUpload,(req,res,next) => {

    const blogTitle = req.body.blogTitle;
    const blogDescription = req.body.blogDescription;
    const imageForBlog = req.files.blogImage[0].filename;
    const blogTime = new Date();

    console.log(blogTitle, blogDescription, imageForBlog, blogTime);

    const blogData = {
        title: blogTitle,
        description: blogDescription,
        image: imageForBlog,
        postDate: blogTime,
    }
    connection.query('INSERT into blogData SET ?',blogData,(err,result) => {
        if(err) throw err;
        else{
            console.log('blog posted successfully');
            res.redirect('http://localhost:3000/home')
        } 
    })
});

module.exports = router;