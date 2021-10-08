const { MongoClient } = require("mongodb");
const crypto = require('crypto');

const url = process.env.DB_URL;

module.exports = async function (context, req) {
    async function run() {
        try {
            const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
            const dbName = "gloryplus";
            const salt = crypto.randomBytes(16).toString('hex');
            await client.connect();
            const db = client.db(dbName);
            const col = db.collection("mandate.users");
            let personDocument = {
                name: req.body.name,
                email: req.body.email,
                password: crypto.pbkdf2Sync(password, this.salt,  
                    1000, 64, `sha512`).toString(`hex`)
            };
            const p = await col.insertOne(personDocument);
        } catch (err) {
            console.log(err.stack);
        }
        finally {
            await client.close();
        }
    }
    run().catch(console.dir);
    context.res = {
        body: 'Your registration was successful.'
    };
}
