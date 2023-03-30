export function toggleStatus(task) {
  task.completed = !task.completed;
}

export function clearCompletedTasks(tasks) {
  return tasks.filter((task) => !task.completed);
}
