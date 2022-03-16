import { Router } from "express";
import speakeasy from 'speakeasy';
import { v4 } from 'uuid';
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig.js";
import Auth from "../models/Auth.js";

const route = Router();
const db = new JsonDB(new Config('baza', true, false, '/'));

route.post('/', async (req, res) => {
    // const id = v4();
    const {userName, password} = req.body;

    try {
        // const path = `/user/${id}`;
        const verify = speakeasy.generateSecret();
        // db.push(path, {id, temp_secret})
        // res.json({id, secret: temp_secret.base32})

        let user = await Auth.findOne({userName});
        if (user) res.status(401).send('user already used');

        user = new Auth({userName, password, verify})
        await user.save()
        
        res.json({user})
    } catch (err) {
        console.log(err);
        res.status(500).send('server error')
    }
})

route.get(`/:id`, async (req, res) => {
    const { token, userId } = req.body;

    try {
        // const path = `/user/${userId}`;
        // const user = db.getData(path);

        let user = await Auth.findById(req.params.id);

        if (!user) {
            return res.status(400).json('no user')
        }
        const {base32:secret} = user.verify


        res.send(user)

        const verified = speakeasy.totp.verify({secret, encoding: 'base32', token});

        // if (verified) {
        //     db.push(path, {id: userId, secret: user.temp_secret})
        //     res.json({verified: true})
        // } else {
        //     res.json({verified: false})
        // }
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json('no user')
        }
        console.log(err);
        res.status(500).send('server.error')
    }
})

route.post('/validate', (req, res) => {
    const { token, userId } = req.body;

    try {
        const path = `/user/${userId}`;
        const user = db.getData(path);
        const {base32:secret} = user.secret

        const tokenValidates = speakeasy.totp.verify({secret, encoding: 'base32', token, window: 1});

        if (tokenValidates) {
            res.json({validated: true})
        } else {
            res.json({validated: false})
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('server.error')
    }
})

export default route;