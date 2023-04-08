const { handleAddListSubmitMock } = require('../../__mocks__/app.js');
const { removeItem } = require('../../__mocks__/app.js');
const { updateCompletedStatus } = require('../../__mocks__/app.js');

describe('handleAddListSubmit', () => {
  test('should add a new task to the tasks array and reset the input field and todo list', () => {
    // Create a mock event object
    const event = { preventDefault: jest.fn() };

    // Set up the test data
    const input1 = { value: 'New task' };
    const tasks = [];
    const todoList = { innerHTML: '' };
    const updateTasksIndex = jest.fn();
    const renderTasks = jest.fn();

    // Call the function being tested
    handleAddListSubmitMock(event, input1, tasks, todoList, updateTasksIndex, renderTasks);

    // Check that the task was added to the tasks array
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toMatchObject({
      description: 'New task',
      completed: false,
      index: 0,
    });

    // Check that the input field was reset
    expect(input1.value).toBe('');

    // Check that the todo list was cleared
    expect(todoList.innerHTML).toBe('');

    // Check that the updateTasksIndex and renderTasks functions were called
    expect(updateTasksIndex).toHaveBeenCalled();
    expect(renderTasks).toHaveBeenCalled();

    // Check that the preventDefault function was called
    expect(event.preventDefault).toHaveBeenCalled();
  });

  test('removeItem should remove the item from the tasks array', () => {
    const tasks = ['task 1', 'task 2', 'task 3'];
    const item = 'task 2';
    removeItem(item, tasks);
    expect(tasks).toEqual(['task 1', 'task 3']);
  });

  test('should toggle completed status of task', () => {
    // create a mock task object with completed set to false
    const task = {
      description: 'Finish coding challenge',
      completed: false,
      index: 0,
    };

    // call the updateCompletedStatus function on the task
    updateCompletedStatus(task);

    // expect the task's completed property to be true
    expect(task.completed).toBe(true);

    // call the updateCompletedStatus function on the task again
    updateCompletedStatus(task);

    // expect the task's completed property to be false again
    expect(task.completed).toBe(false);
  });
});
