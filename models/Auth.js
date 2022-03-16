import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    verify: {
        type: Object
    },
    verified: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('Auth', AuthSchema);