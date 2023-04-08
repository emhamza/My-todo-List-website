import { clearCompletedTasks } from '../function.js';

describe('clearCompletedTasks', () => {
  it('should remove completed tasks from the input array', () => {
    const tasks = [
      { description: 'Task 1', completed: true },
      { description: 'Task 2', completed: false },
      { description: 'Task 3', completed: true },
    ];

    const expectedOutput = [
      { description: 'Task 2', completed: false },
    ];

    expect(clearCompletedTasks(tasks)).toEqual(expectedOutput);
  });

  it('should return an empty array if all tasks are completed', () => {
    const tasks = [
      { description: 'Task 1', completed: true },
      { description: 'Task 2', completed: true },
      { description: 'Task 3', completed: true },
    ];

    const expectedOutput = [];

    expect(clearCompletedTasks(tasks)).toEqual(expectedOutput);
  });

  it('should return the input array if no tasks are completed', () => {
    const tasks = [
      { description: 'Task 1', completed: false },
      { description: 'Task 2', completed: false },
      { description: 'Task 3', completed: false },
    ];

    const expectedOutput = [
      { description: 'Task 1', completed: false },
      { description: 'Task 2', completed: false },
      { description: 'Task 3', completed: false },
    ];

    expect(clearCompletedTasks(tasks)).toEqual(expectedOutput);
  });
});
