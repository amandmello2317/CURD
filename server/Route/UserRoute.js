const express = require('express')
const {UserInsert , DisplayUser, UpdateUser, DeleteUser} = require('../Controler/UserController')
const multer = require('multer')

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'upload')
    },
    filename: function(req, file, cb){
        const unique = Date.now()
        cb(null, unique+ "-" + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post("/userinsert",upload.array('img'), UserInsert)
router.get("/display", DisplayUser)
router.put("/update/:id", UpdateUser)
router.delete("/delete/:id", DeleteUser)

module.exports = router