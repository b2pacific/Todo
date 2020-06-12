const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    item: String
})

const Tasks = mongoose.model("Tasks", taskSchema);
module.exports = {
    taskSchem: taskSchema,
    Tasks: Tasks
};