import { v4 as uuidv4 } from 'uuid';
import dbClient from './db';
import redisClient from './redis';
import sha1 from 'sha1';

export const getBasicAuth = (request) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) { return null; }
    const token = authHeader.split(' ')[1];

    const decodedToken = Buffer.from(token, 'base64').toString('utf-8');
    const [email, password] = decodedToken.split(':');

    return { email, password };
}

export const authenticateUser = async (email, password) => {
    const user = await dbClient.findUserByEmail(email);

    if (!user) { return null; }
    const hashedPassword = sha1(password);
    if (user.password !== hashedPassword) { return null; }
    return user;
}

export const generateSessionAuth = async (userId) => {
    const token = uuidv4();
    const key = `auth_${token}`;
    await redisClient.set(key, userId, 24 * 60 * 60);
    return { token }
}

export const getSessionToken = (request) => {
    const xHeader = request.headers['x-token'];
    if (!xHeader) { return null; }
    return xHeader;
}

export const deleteSessionToken = async (token) => {
    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) { return false; }
    await redisClient.del(`auth_${token}`);
    return true;
}

export const getUserFromSession = async (token) => {
    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) { return null; }
    const user = await dbClient.findUserById(userId);
    if (!user) { return null; }
    return { email: user.email, id: user._id }
}

export const getCurrentUser = async (request) => {
    const token = getSessionToken(request);
    if (!token) { return null; }
    const user = await getUserFromSession(token);
    if (!user) { return null; }
    return user;
}