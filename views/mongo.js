const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/LogInCollection", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {
    console.log('Mongoose connected');
})
.catch((e) => {
    console.log('Failed to connect to MongoDB');
});

const logInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const LogInCollection = mongoose.model('LogInCollection', logInSchema);

module.exports = LogInCollection;
