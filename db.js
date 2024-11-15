const { connect } = require("mongoose");
 
// DataBase =>
exports.main = async () => {
    try {
        await connect("mongodb://127.0.0.1:27017/reddis")
        console.log("database connected")
    } catch (error) {
        console.log("database not connected")
    }
}