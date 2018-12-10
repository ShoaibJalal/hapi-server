const Joi = require("joi");
const knex = require("../db");

module.exports = [
  {
    method: "GET",
    path: "/task",
    handler: async (request, h) => {
      const userId = 1; //hard coded for now
      const tasks = await knex("task").where("user_id", userId);
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
    method: "PATCH",
    path: "/task/{id}",
    handler: async (request, h) => {
      const taskId = request.params.id;
      const title = request.payload.title;

      const patched = await knex("task")
        .update({ title: title })
        .where("id", taskId);
      return { message: "Task patched" };
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
    method: "PATCH",
    path: "/task/{task_id}/item/{id}",
    handler: async (request, h) => {
      const itemId = request.params.id;
      const item = request.payload;

      const patched = await knex("task_item")
        .update(item)
        .where("id", itemId);
      return { message: "Item patched" };
    },
    config: {
      validate: {
        payload: {
          text: Joi.string(),
          done: Joi.boolean()
        }
      }
    }
  },
  {
    method: "DELETE",
    path: "/task/{id}",
    handler: async (request, h) => {
      const id = request.params.id;
      const deleted = await knex("task")
        .where("id", id)
        .delete();
      return { message: "Task deleted" };
    }
  },
  {
    method: "DELETE",
    path: "/task/{taskId}/item/{id}",
    handler: async (request, h) => {
      const id = request.params.id;
      const deleted = await knex("task_item")
        .where("id", id)
        .delete();
      return { message: "Item deleted" };
    }
  }
];
