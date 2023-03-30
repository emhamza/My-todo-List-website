import { toggleStatus, clearCompletedTasks } from './function.js';

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Getting data from local storage

if (localStorage.getItem('tasks') !== null) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

function updateTasksIndex() {
  tasks.forEach((task, index) => {
    task.index = index;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export default function renderTasks() {
  const todoList = document.getElementById('todo-list');
  const firstBlock = document.createElement('div');
  const title = document.createElement('h2');
  title.textContent = 'Today\'s To Do';
  title.classList.add('my-title');

  // create refresh arrow icon element
  const refreshIcon = document.createElement('i');
  refreshIcon.classList.add('fas', 'fa-redo', 'fa-sm', 'fa-rotate', 'fa-rotate-300', 'refresh-icon');
  refreshIcon.addEventListener('click', () => {
    // reload the page when the icon is clicked
    window.location.reload();
  });

  // append the title and the refresh icon to the firstBlock element
  title.appendChild(refreshIcon);
  firstBlock.appendChild(title);

  const addList = document.createElement('form');
  const input1 = document.createElement('input');
  input1.setAttribute('placeholder', 'Add to your list...');
  input1.setAttribute('type', 'text');
  input1.classList.add('add-input');
  const submitButton = document.createElement('button');
  submitButton.classList.add('arrow-symbol');
  submitButton.type = 'submit';
  submitButton.innerHTML = '&#8629;';
  addList.appendChild(input1);
  addList.appendChild(submitButton);
  firstBlock.appendChild(addList);

  const sortedTasks = tasks.sort((a, b) => a.index - b.index);
  const mainList = document.createElement('ul');

  const taskItems = sortedTasks.map((task) => {
    const item = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      toggleStatus(task);
      item.classList.toggle('completed');
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    const description = document.createElement('input');
    description.value = task.description;
    description.classList.add('list-description');
    description.setAttribute('contenteditable', true); // make the task description editable

    // save updated task description to localStorage on input change
    description.addEventListener('input', () => {
      task.description = description.value;
      updateTasksIndex();
    });

    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-ellipsis-v', 'vertical-icon');
    icon.addEventListener('click', () => {
      const index = tasks.indexOf(task);
      tasks.splice(index, 1);
      updateTasksIndex();
      item.remove();
    });

    item.appendChild(checkbox);
    item.appendChild(description);
    item.appendChild(icon);

    if (task.completed) {
      item.classList.add('completed');
    }

    return item;
  });

  taskItems.forEach((item) => {
    mainList.appendChild(item);
  });

  todoList.appendChild(firstBlock);
  todoList.appendChild(mainList);

  // create button element
  const clearButton = document.createElement('button');
  clearButton.classList.add('clear-btn');
  clearButton.type = 'button';
  clearButton.textContent = 'Clear all completed';
  clearButton.addEventListener('click', () => {
    // filter out completed filter tasks
    tasks = clearCompletedTasks(tasks);
    // re-render the list
    todoList.innerHTML = '';
    updateTasksIndex();
    renderTasks();
  });

  // append the button to the end of the list
  todoList.appendChild(clearButton);

  // add event listener to the form
  addList.addEventListener('submit', (event) => {
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
  });
}
