import mongoose from "mongoose";

const AdminScheme = new mongoose.Schema({
    audio: {
        data: Buffer,
        contentType: String
    },
    title: {
        type: String,
        required: true
    },
    cover: {
        data: Buffer,
        contentType: String
    },
    created: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model('Admin', AdminScheme)