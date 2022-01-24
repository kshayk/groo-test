const mongoose = require("mongoose");

module.exports = {
    checkActiveDatabaseConnection: async () => {
        if (mongoose.connection.readyState !== 1) {
            try {
                await mongoose.connect(process.env.MONGODB_HOST + process.env.MONGODB_DATABASE);
            } catch {
                throw "Failed connecting to the database"
            }
        }
    }
}