var express = require('express');
var mongojs = require('mongojs');
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();
var jwt = require('jsonwebtoken');
var multer = require('multer');
var path = require('path');
var fs = require('fs');

dbname = "stud";
collection = ['stud'];
var db = mongojs(dbname, collection);

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'upload');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });

router.post('/addstud', upload.single('file'), function(req, res) {
    db.student.save({ name: req.body.name, email: req.body.email, password: req.body.password, enrollnment_no: req.body.enrollnment_no, r_password: req.body.r_password, file: req.file }, function(err, msg) {
        if (err) {
            console.log(err);
        } else {
            var payload = { subject: msg._id, };
            var token = jwt.sign(payload, 'secretKey');
            res.status(200).send({ token });
        }
    });
});

router.get('/img/:id', function(req, res) {
    id = req.params.id;
    db.student.findOne({ "_id": ObjectId(id) }, function(err, msg) {
        if (err) {
            console.log(err);
        } else {
            require('fs').readFile(msg.file.path, function(err, content) {
                if (err) {
                    res.writeHead(400, { 'Content-type': 'text/html' })
                    console.log(err);
                    res.send("No such image");
                } else {
                    res.send(content);
                }
            });
        }
    });
});

router.post('/login', function(req, res) {
    var userData = req.body;
    db.student.findOne({ email: userData.username }, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            if (!user) {
                res.status(401).send('Invalid email');
            } else if (user.password !== userData.password) {
                res.status(401).send('Invalid password');
            } else {
                var payload = { subject: user._id };
                var token = jwt.sign(payload, 'secretKey');
                res.status(200).send({ token });
            }
        }
    });
});


router.get('/getData', (req, res) => {
    db.student.find({}, function(err, msg) {
        if (err) {
            console.log(err);
        } else {
            res.send(msg);
            res.end();
        }
    });
});

router.put('/deletePhoto', function(req, res) {
    fs.unlink(req.body.file.path, function(err, msg) {
        if (err) {
            console.log(err);
        } else {
            res.send("file deleted successfully");
            res.end();
        }
    });
});

router.delete('/deleteData/:id', function(req, res) {
    id = req.params.id;
    db.student.remove({ "_id": ObjectId(id) });
    res.status(200).send({
        "msg": "record deleted successfully"
    });
});

router.put('/updateData/:id', upload.single('file'), function(req, res) {
    var id = req.params.id;
    db.student.updateOne({ "_id": ObjectId(id) }, {
        $set: {
            "name": req.body.name,
            "email": req.body.email,
            "password": req.body.password,
            "enrollnment_no": req.body.enrollnment_no,
            "r_password": req.body.r_password,
            "file": req.file
        },
    }, function(err, msg) {
        if (err) {
            console.log(err);
        } else {
            res.send(msg);
            res.end();
        }
    });
});

router.get('/getLastData', function(req, res) {
    db.student.find({}).sort({ _id: -1 }).limit(1).toArray(function(err, msg) {
        if (err) {
            console.log(err);
        } else {
            res.send(msg);
            res.end();
        }
    });
});



router.get('/getLinkData/:id', function(req, res) {
    var id = req.params.id;
    db.student.find({ "_id": ObjectId(id) }, function(err, msg) {
        if (err) {
            console.log(err);
        } else {
            res.send(msg);
            res.end();
        }
    });
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    var token = req.headers.authorization.split(' ')[1];
    if (token == null) {
        return res.status(401).send('Unauthorized request');
    }
    var payload = jwt.verify(token, 'secretKey', function(err, decoded) {
        if (err) {
            console.log(err);
        }
    });
    if (!payload) {
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
}

module.exports = router;