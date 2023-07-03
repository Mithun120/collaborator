const mongoose=require('mongoose')
const clientSchema=new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        clientImg: {
            type: String
        }
    }
)
module.exports = mongoose.model('Client', clientSchema) 
