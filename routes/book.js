import { Router } from "express";
import { check, validationResult } from "express-validator";
import multer from "multer";
import Book from "../models/Book.js";
import admin from "../models/admin.js";
const route = Router();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./cloud");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '__' + file.originalname)
    }
})

const upload = multer({storage: fileStorage});

route.post('/kitob', upload.fields([
    {name: 'audio', maxCount: 1},
    {name: 'cover', maxCount: 1}
]), async (req, res) => {
    const {title} = req.body;
    try {
        let book = await admin.findOne({title});
        if (book) res.status(400).send('this is already taken')

        book = new admin({
            audio: {
                data: req.files.audio[0].filename,
                contentType: 'audio/mp3'
            },
            cover: {
                data: req.files.cover[0].filename,
                contentType: 'image/jpg'
            },
            title
        })
        
        await book.save()
        
        res.send(book)
    } catch (err) {
        res.status(500).send('server error')
        console.log(err)
    }
})

route.get('/', async (req, res) => {
    const books = await Book.find();

    res.send(books)
})

route.post('/', [
    check('title', 'Nom berilishi lozim!')
        .isEmpty(),
    check('audio', 'Audio shart')
        .not(),
    check('audioName', 'Audio uchun nom!')
        .not(),
    check('coverImage', 'Rasmsiz bomeydita :(')
        .not(),
    
], upload.single("audio"), async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    const {title, audioName, coverImage} = req.body

    try {
        let book = await Book.findOne({title});
        if (book) return res.status(401).json({errors: [{msg: 'bunday kitob avval hom joylangan!'}]})

        book = new Book({
            title,
            audio: {
                data: req.file.filename
            },
            audioName,
            coverImage
        });

        await book.save();

        res.json({book})

    } catch (err) {
        console.log(err.message);
        res.send('server error')
    }
})

export default route;