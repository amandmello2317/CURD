const UserSchema = require("../Model/UserSchema");


// Insert
const UserInsert = (req, res) => {

    try {
        const { name, email, age, phone } = req.body

        // const image  = req.file.filename;
        const image  = req.files.map((i) => i.filename)
        console.log(image, 2);

        const user = new UserSchema({
            name,
            email,
            age,
            phone,
            img: image
        })
        const saveUser = user.save()
        res.send(saveUser)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal error")

    }
}

// View  All

const DisplayUser = async (req, res) => {
    try {
        const val = await UserSchema.find()
        res.json(val)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal error")
    }
}

// Update 

const UpdateUser = async (req, res) => {
    const {name, phone, email, age} = req.body
    try {
        const newData = {}
        if (name){
            newData.name = name
        }
        if (phone){
            newData.phone = phone
        }
        if (email) {
            newData.email = email

        }
        if(age) {
            newData.age = age
        }

        let data = await UserSchema.findById(req.params.id)
        console.log(req.params.id);

        if(!data){
            return res.status(404).send("Not Found")
        }

        data = await UserSchema.findByIdAndUpdate(
            req.params.id, 
            {$set : newData},
            { new: true }
        )
        res.json({data})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error")
    }   
}

// Delete

const DeleteUser  = async(req, res) => {
    try {
        let user = await UserSchema.findById(req.params.id)
        if(!user){
            return res.status(404).send("Not Found")

        }
        user = await UserSchema.findByIdAndDelete(req.params.id)
        res.json({user:user })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error")
    }
} 

module.exports = {UserInsert, DisplayUser, UpdateUser, DeleteUser}
