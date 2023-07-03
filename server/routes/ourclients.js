let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4'),
    router = express.Router();
const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
// User model
let Client = require('../models/ourclients');
router.post('/clientpost', upload.single('clientImg'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const user = new Client({
        _id: new mongoose.Types.ObjectId(),    
        clientImg: url + '/public/' + req.file.filename,

    });
    user.save().then(result => {
        res.status(201).json({
            message: "New Happy Client!",
            clientCreated: {
                _id: result._id,
                clientImg: result.clientImg
                
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})
// router.get("/", (req, res, next) => {
//     User.find().then(data => {
//         res.status(200).json({
//             message: "User list retrieved successfully!",
//             users: data
//         });
//     });
// });



router.get('/clientget', async (req, res) => {
  try {
    const userProfiles = await Client.find();
    res.status(200).json(userProfiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}); 
router.put('/clientput/:id', upload.single('clientimg'), async (req, res) => {
  const url = req.protocol + '://' + req.get('host')
  console.log(req.body);
  const domainimgUrl = req.file ? url +"/public/"+ req.file.filename : null;
  try {
    const user = await Client.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          clientImg: domainimgUrl,
        }
      },
      { new: true }
    );

    res.json({ message: 'Client updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a user profile
// router.put('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { domainimg, domaintitle, desc, githublink } = req.body;

//     const userProfile = await User.findById(id);
//     if (!userProfile) {
//       return res.status(404).json({ error: 'User profile not found' });
//     }

//     const updatedFields = {};
//     if (domainimg) updatedFields.domainimg = domainimg;
//     if (domaintitle) updatedFields.domaintitle = domaintitle;
//     if (desc) updatedFields.desc = desc;
//     if (githublink) updatedFields.githublink = githublink;

//     await userProfile.updateOne({ $set: updatedFields });

//     const updatedUserProfile = await User.findById(id);

//     res.json(updatedUserProfile);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

//delete
router.delete('/clientdelete/:clientId', (req, res, next) => {
    const userId = req.params.clientId;
    Client.deleteOne({ _id: userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Client deleted',
          result: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  


module.exports = router;