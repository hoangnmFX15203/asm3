const { default: mongoose } = require('mongoose');

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        if (connect.connection.readyState == 1) {
            console.log('Connected');
        } else {
            console.log('Failed to connect');
        }
    } catch (err) {
        console.log('connection fail');
        throw new Error(err);
    }
};

module.exports = dbConnect;
