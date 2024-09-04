import { getBasicAuth, authenticateUser, deleteSessionToken, getSessionToken } from "../utils/auth";

class AuthControllers {
    static async getConnect(req, res) {
        const { email, password } = getBasicAuth(req);

        const user = authenticateUser(email);
        if (!email || !password || !user) {
            return res.status(401).json({
                error: 'Unauthorized'
            })
        }

        const token = await generateSessionAuth(user._id);
        return res.status(200).json(token);
    }

    static async getDisconnect(req, res) {
        const token = getSessionToken(req);

        if (!token) {
            return res.status(401).json({
                error: 'Unauthorized',
            });
        }

        const result = await deleteSessionToken(token);
        if (!result) {
            return res.status(401).json({
                error: 'Unauthorized'
            });
        }
        return res.sendStatus(204);
    }
}

export default AuthControllers;