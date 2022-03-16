import { Router } from "express";
import { check, validationResult } from "express-validator";
import Auth from "../models/Auth.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import auth from "../middleware/auth.js";

const route = Router();

route.get('/login', async (req, res) => {
    try {
        let users = await Auth.find().limit(3);
        res.json(users)
    } catch (err) {
        res.status(500).send('server error')
        console.log(err)
    }
})

route.post('/yangi-hisob',[
    check('userName', 'foydalanuvchi nomini kiriting!')
        .not()
        .isEmpty(),
    check('password', 'Kalit so\'zi kamida 10ta')
        .isLength({min: 10, max: 42})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(401).json({errors: errors.array()})
    }
    const {userName, password} = req.body;

    try {
        let user = await Auth.findOne({userName});
        if (user) res.status(401).json({errors: [{msg: 'foydalanuvchi nomi avvalroq band qilindi!'}]});

        user = new Auth({userName, password});

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.JWT, {expiresIn: 3600}, (err, token) => {
            if (err) throw err;

            res.send(token)
        })

    } catch (err) {
        res.status(500).send('server error')
        console.log(err)
    }
})

route.get('/tasdiqlash', auth, async (req, res) => {
    try {
        const user = await Auth.findById(req.user.id).select('-password');
        res.send(user)
    } catch (err) {
        console.log(err);
        res.send('serr')
    }
})

route.post('/kirish',[
    check('userName', 'foydalanuvchi nomini kiriting!')
        .not()
        .isEmpty(),
    check('password', 'Kalit so\'zi kamida 10ta')
        .isLength({min: 10, max: 42})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(401).json({errors: errors.array()})
    }

    const {userName, password} = req.body;

    try {
        const user = await Auth.findOne({userName});
        if (!user) return res.status(400).json({errors: [{msg: 'foydalanuvchi topilmadi!'}]});

        const isMatch = await bcrypt.compare(password, user.password); 

        if (!isMatch) {
            return res.status(400).json({errors: [{msg: 'Kalit so\'zi xato kiritildi!'}]})
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.JWT, {expiresIn: 3600}, (err, token) => {
            if (err) throw err;

            res.send(token)
        })

    } catch (err) {
        console.log(err.message)
        res.status(500).json({errors: [{msg: 'Kirishda server xatosi!'}]})
    }
})

route.get('/barcha-hisoblar', auth, async (req, res) => {
    try {
        const users = await Auth.find();
        const isAdmin = await Auth.findById(req.user.id)

        if (isAdmin.admin) {
            return res.json(users)
        } else {
            return res.status(400).json({errors: [{msg: 'Foydalanuvchilarni faqat adminlargina ko\'ra oladi!'}]})
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({errors: [{msg: 'server error'}]})
    }
})

export default route;