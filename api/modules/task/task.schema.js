const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrmCustomValidator = require('../../utils/services/OrmCustomValidator');
const taskSchema = {
    title: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return OrmCustomValidator.validateForType(value, 'string');
            },
            message: `Data Type Error: Value`
        }
    },
    date: {
        type: Schema.Types.Date,
        default: Date.now()
    },
    description: {
        type: String
    }
}

module.exports = new Schema(taskSchema, {
    strict: true,
    versionKey: false,
    validateBeforeSave: true
});