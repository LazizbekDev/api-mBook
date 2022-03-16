import jwt from "jsonwebtoken";

export default function (req, res, next) {
    const token = req.header('muffid-kitoblari-token');

    if (!token) {
        return res.status(401).json({errors: [{msg: 'Kirish tokeni topilmadi!'}]});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT);

        req.user = decoded.user;

        next();
    } catch (err) {
        console.log(err)
        res.status(401).json({errors: [{msg: 'token xatosi'}]});
    }
}