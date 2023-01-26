/** @jest-environment jsdom */
import Library from './library.js';

describe('Testing To Do list: part 1', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    localStorage.setItem.mockClear();
    document.body.innerHTML = `
    <div id="to_do_list">
    </div>
`;
  });

  test('adding a list', () => {
    const newlist = new Library();
    newlist.addList('hi');
    const storage = JSON.parse(window.localStorage.getItem('todolist'));
    expect(storage).toHaveLength(1);
  });

  test('removing a list', () => {
    const newlist = new Library();
    newlist.addList('hi');
    newlist.addList('hi');
    newlist.addList('hi');
    newlist.removeList(0);
    const storage = JSON.parse(window.localStorage.getItem('todolist'));
    expect(storage).toHaveLength(2);
  });

  test('updating completed status', () => {
    const newlist = new Library();
    newlist.addList('hi');
    newlist.checkList(0);
    const storage = JSON.parse(window.localStorage.getItem('todolist'));
    expect(storage[0].completed).toBe(true);
  });

  test('editing list description', () => {
    const newlist = new Library();
    newlist.addList('hi');
    newlist.editList('new descp', 0);
    const storage = JSON.parse(window.localStorage.getItem('todolist'));
    expect(storage[0].description).toBe('new descp');
  });

  test('clearing all completed tasks', () => {
    const newlist = new Library();
    newlist.addList('hi');
    newlist.addList('hi');
    newlist.checkList(0);
    newlist.clearAllCompleted();
    const storage = JSON.parse(window.localStorage.getItem('todolist'));
    expect(storage).toHaveLength(1);
  });
});