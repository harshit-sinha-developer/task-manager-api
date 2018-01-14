const TaskModel = require('./task.model');
const NotFoundError = require('../../utils/errors/NotFoundError');
const BadRequestError = require('../../utils/errors/BadRequestError');

class TaskController {
    static getAllTasks(req, res) {
        const query = req.query.limit ? { limit: req.query.limit } : {};
        TaskModel.getAllTasks(query).then(tasks => {
            res.status(200).json(tasks);
        }).catch(err => {
            res.status(err.httpCode).json({ message: "Oops! Something went wrong" });
        })
    }

    static getTask(req, res) {
        TaskModel.getTaskById(req.params.id).then(task => {
            res.status(200).json(task);
        }).catch(err => {
            if (err instanceof BadRequestError) {
                res.status(err.httpCode).json({ message: err.message, errors: err.errors });
            } else {
                res.status(err.httpCode).json({ message: err.message });
            }
        });
    }

    static createTask(req, res) {
        TaskModel.createTask(req.body).then(result => {
            res.status(201).json({ id: result._id.toString() });
        }).catch(err => {
            if (err instanceof BadRequestError) {
                res.status(err.httpCode).json({ message: err.message, errors: err.errors });
            } else {
                res.status(err.httpCode).json({ message: err.message })
            }
        });
    }

    static updateTask(req, res) {
        TaskModel.updateTaskById(req.params.id, req.body).then(result => {
            res.status(204).send();
        }).catch(err => {
            if (err instanceof BadRequestError) {
                res.status(err.httpCode).json({ message: err.message, errors: err.errors });
            } else {
                res.status(err.httpCode).json({ message: err.message })
            }
        });
    }

    static deleteTask(req, res) {
        TaskModel.deleteTaskById(req.params.id).then(result => {
            res.status(204).send();
        }).catch(err => {
            res.status(err.httpCode).json({ message: err.message })
        });
    }
}

module.exports = TaskController;