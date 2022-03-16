import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    audio: {
        data: Buffer,
        contentType: String
    },
    audioName: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    }
})

export default mongoose.model('Book', BookSchema);