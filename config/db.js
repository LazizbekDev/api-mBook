import mongoose from "mongoose";
import config from "config";

const connect = async () => {
    try {
        await mongoose.connect(config.get('db'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("Bazaga bog'lanildi!")
    } catch (err) {
        console.log(err);
        console.log(process.exit(0));
    }
}

export default connect;