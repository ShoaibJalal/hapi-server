const Joi = require("joi");
const knex = require("../db");

/* const tasksList = [
  {
    title: "Shopping",
    dateCreated: "Dec 6, 2018",
    list: [
      { text: "Node.js Books", done: false },
      { text: "MacBook", done: false },
      { text: "Food", done: true }
    ]
  },
  {
    title: "Places to visit",
    dateCreated: "Aug 12, 2018",
    list: [
      { text: "Nairobi, Kenya", done: false },
      { text: "Moscow, Russia", done: false },
      { text: "Helsinki, Finland", done: false }
    ]
  }
]; */

module.exports = [
  {
    method: "GET",
    path: "/task",
    handler: async (request, h) => {
      const userId = 1; //hard coded for now
      const tasks = await knext("task").where("user_id", userId);
      return tasks;
    }
  },
  {
    method: "GET",
    path: "/task/{id}",
    handler: async (request, h) => {
      const id = request.params.id;
      const userId = 1;
      const [task] = await knex("task").where({
        id: id,
        user_id: userId
      });
      if (task) return task;
      return { message: "Not found", code: "status code: 404" };
    }
  },
  {
    method: "POST",
    path: "/task",
    handler: async (request, h) => {
      const task = request.payload;
      task.user_id = 1; // Hard coded for now
      /*using array-destructuring here since the
         returned result is an array with 1 element */
      const [taskId] = await knex("task")
        .returning("id")
        .insert(task);
      return { message: "Task created", task_id: taskId };
    },
    config: {
      validate: {
        payload: {
          title: Joi.string().required()
        }
      }
    }
  },
  {
    method: "POST",
    path: "/task/{id}/item",
    handler: async (request, h) => {
      const taskItem = request.payload;
      taskItem.task_id = request.params.id;
      const [id] = await knex("task_item").insert(taskItem);
      return { message: "Item created", id: id };
    },
    config: {
      validate: {
        payload: {
          text: Joi.string().required()
        }
      }
    }
  },
  {
    method: "GET",
    path: "/task/{id}/item",
    handler: async (request, h) => {
      const taskId = request.params.id;
      const items = await knex("task_item").where("task_id", taskId);
      return items;
    }
  },
  {
    method: "PUT",
    path: "/task/{id}",
    handler: (request, h) => {
      const index = request.params.id - 1;
      // replace the whole resource with the new one
      tasksList[index] = request.payload;
      return { message: "Task Updated." };
    }
  },
  {
    method: "PATCH",
    path: "/task/{id}",
    handler: (request, h) => {
      const index = request.params.id - 1;
      // task to be patched
      const task = tasksList[index];
      // for each key provided, update on the resource
      Object.keys(request.payload).forEach(key => {
        if (key in task) {
          task[key] = request.payload[key];
        }
      });
      return { message: "Task patched" };
    }
  },
  {
    method: "DELETE",
    path: "/task/{id}",
    handler: (request, h) => {
      const index = request.params.id - 1;
      delete tasksList[index]; // replaces with `undefined`
      return { message: "Task deleted" };
    }
  }
];
