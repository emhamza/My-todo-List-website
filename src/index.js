/* eslint-disable linebreak-style */
import _ from 'lodash';
import './style.css';

const tasks = [
  {
    description: 'Learn JavaScript',
    completed: false,
    index: 0,
  },
  {
    description: 'Practice coding challenges',
    completed: false,
    index: 1,
  },
  {
    description: 'Build a project',
    completed: false,
    index: 2,
  },
];

function renderTasks() {
  const todoList = document.getElementById('todo-list');

  const sortedTasks = tasks.sort((a, b) => a.index - b.index);

  const taskItems = sortedTasks.map((task) => {
    const item = document.createElement('li');
    item.textContent = task.description;

    if (task.completed) {
      item.classList.add('completed');
    }

    return item;
  });

  taskItems.forEach((item) => {
    todoList.appendChild(item);
  });
}

renderTasks();
