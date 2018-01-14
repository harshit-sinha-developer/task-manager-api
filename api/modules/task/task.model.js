const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskSchema = require('./task.schema');
const model = mongoose.model('Task', TaskSchema);
const NotFoundError = require('../../utils/errors/NotFoundError');
const BadRequestError = require('../../utils/errors/BadRequestError');
const ErrorFormatter = require('../../utils/services/ErrorFormatter');

class TaskModel {
    static createTask(taskObject) {
        return model.create(taskObject).catch(err => {
            throw ErrorFormatter.createResponseError(err);
        });
    }

    static getTaskById(taskId) {
        return model.findById(taskId).then(result => {
            if (result === null) {
                throw (new NotFoundError(`Task id: ${taskId} does not exists`));
            }
            return Promise.resolve(result);
        }).catch(err => {
            if (err instanceof NotFoundError) {
                throw err;
            }
            throw ErrorFormatter.createResponseError(err);
        });
    }

    static getAllTasks(query) {
        const limit = query.limit || 10;
        return model.find({}).limit(limit).then(result => {
            if (result === null) {
                return Promise.reject(new NotFoundError(`Tasks not found`));
            }
            return Promise.resolve(result);
        });
    }

    static updateTaskById(taskId, taskObject) {
        return model.findById(taskId).then(result => {
            if (result === null) {
                throw (new NotFoundError(`Task id: ${taskId} does not exists`));
            }
            return Promise.resolve();
        }).then(() => {
            return model.findByIdAndUpdate(taskId, taskObject);
        }).catch(err => {
            if (err instanceof NotFoundError) {
                throw err;
            }
            throw ErrorFormatter.createResponseError(err);
        });;
    }

    static deleteTaskById(taskId) {
        return model.findByIdAndRemove(taskId).then((result) => {
            if (result === null) {
                throw (new NotFoundError(`Task id: ${taskId} does not exists`));
            }
            return Promise.resolve(result);
        }).catch(err => {
            if (err instanceof NotFoundError) {
                throw err;
            }
            throw ErrorFormatter.createResponseError(err);
        });;
    }
}

module.exports = TaskModel;