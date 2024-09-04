import { MongoClient, ObjectId } from "mongodb";
import sha1 from "sha1"

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const DB = process.env.DB_DATABASE || 'files_manager';
const MONGO_URI = `mongodb://${HOST}:${PORT}/${DB}`;

class DBClient {
    constructor() {
        this.client = new MongoClient(MONGO_URI);
        this.connected = false;
        this.db = null;
        this.client.connect((err) => {
            if (!err) {
                this.connected = true;
                this.db = this.client.db(DB);
            }
        });
    }

    isAlive() {
        return this.connected;
    }

    async nbUsers() {
        return this.db.collection('users').countDocuments();
    }

    async nbFiles() {
        return this.db.collection('files').countDocuments();
    }

    filesCollection() {
        return this.db.collection('files');
    }

    findUserByEmail(email) {
        return this.db.collection('users').findOne({ email })
    }

    findUserById(userId) {
        return this.db.collection('users').findOne({ _id: ObjectId(userId) });
    }

    async addUser(email, password) {
        const result = await this.db.collection('users').insertOne({
            email,
            password: sha1(password)
        })
        return {
            email: result.ops[0].email,
            id: result.ops[0]._id
        }
    }
}

const dbClient = new DBClient();
export default dbClient;