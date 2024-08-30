class AuthControllers {
    static getConnect(req, res) {
        const { email, password } = req.body;
        res.header.authorization = `${email}:${password}`;

        if (!email || !password) {
            return res.status(401).json({
                error: 'Unauthorized'
            })
        }
    }
}

export default AuthControllers;