const tasksList = [
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
];

module.exports = [
  {
    method: "GET",
    path: "/tasks",
    handler: (request, h) => {
      return tasksList;
    }
  },
  {
    method: "GET",
    path: "/tasks/{id}",
    handler: (request, h) => {
      const id = request.params.id - 1; // since array is 0-based index
      // should return 404 error if item
      // is not found
      if (tasksList[id]) return tasksList[id];
      return { message: "Not found" }.code(404);
    }
  },
  {
    method: "POST",
    path: "/tasks",
    handler: (request, h) => {
      const task = request.payload;
      tasksList.push(task);
      return { message: "Task created" };
    }
  }
];
