const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect("mongodb+srv://MongoDB:yEhsIugTGb4ZKjBK@cluster0-3bkij.mongodb.net/test?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
}

module.exports = connectDB;
