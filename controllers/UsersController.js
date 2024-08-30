import dbClient from "../utils/db";
import sha1 from "sha1"

class UsersControllers {
    static async postNew(req, res) {
        const { email, password } = req.body;

        if (!email) {
            // res.statusCode = 400;
            res.status(400).json({ error: 'Missing Email' });
        }
        if (!password) {
            // res.statusCode = 400;
            res.status(400).json({ error: 'Missing Password' });
        }

        const existingUser = await dbClient.db.collection('users').findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: 'Already exists' });
        }

        const newUser = await dbClient.db.collection('users').insertOne({
            email,
            password: sha1(password)
        })
        res.status(201).json({
            email: newUser.ops[0].email,
            id: newUser.ops[0]._id,
        })
    }
}

export default UsersControllers;