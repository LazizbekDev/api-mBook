import mongoose from "mongoose";
import colors from "colors";
import config from "config";

const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost/muffid', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("Bazaga bog'lanildi!".cyan)
    } catch (err) {
        console.log(err);
        console.log(process.exit(0));
    }
}

export default connect;