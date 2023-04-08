function handleAddListSubmitMock(event, input1, tasks, todoList, updateTasksIndex, renderTasks) {
  event.preventDefault();
  const inputValue = input1.value.trim();
  if (inputValue) {
    const newTask = {
      description: inputValue,
      completed: false,
      index: tasks.length,
    };
    tasks.push(newTask);
    input1.value = '';
    todoList.innerHTML = '';
    updateTasksIndex();
    renderTasks();
  }
}

function removeItem(item, tasks) {
  const index = tasks.indexOf(item);
  tasks.splice(index, 1);
}

function updateCompletedStatus(task) {
  task.completed = !task.completed;
}

exports.handleAddListSubmitMock = handleAddListSubmitMock;
exports.removeItem = removeItem;
exports.updateCompletedStatus = updateCompletedStatus;