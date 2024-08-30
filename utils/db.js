import { MongoClient } from "mongodb";

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
}

const dbClient = new DBClient();
export default dbClient;