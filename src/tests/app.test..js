import renderTasks from '../app.js';

describe('renderTasks function', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should add new task to the todo list', (render, fireEvent) => {
    const { getByPlaceholderText, getByText } = render(`${document.body.innerHTML}<div id="todo-list"></div>`);
    const input = getByPlaceholderText('Add to your list...');
    const addButton = getByText('&#8629;');

    // Add a new task
    fireEvent.input(input, { target: { value: 'Write unit tests' } });
    fireEvent.click(addButton);

    // Assert that the new task has been added to the list
    expect(getByText('Write unit tests')).toBeInTheDocument();
  });
});