import { getCurrentUser } from "../utils/auth";
import dbClient from "../utils/db";

class UsersControllers {
    static async postNew(req, res) {
        const { email, password } = req.body;

        if (!email) {
            // res.statusCode = 400;
            res.status(400).json({ error: 'Missing Email' });
        }
        if (!password) {
            res.status(400).json({ error: 'Missing Password' });
        }

        const existingUser = await dbClient.findUserByEmail(email);
        if (existingUser) {
            res.status(400).json({ error: 'Already exists' });
        }

        const newUser = await dbClient.addUser(email, password);
        res.status(201).json(newUser)
    }

    static getUser(req, res) {
        const user = getCurrentUser(req);
        if (!user) {
            return res.status(401).json({
                error: 'Unauthorized'
            })
        }
        return user;
    }
}

export default UsersControllers;