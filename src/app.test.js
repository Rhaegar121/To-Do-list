/** @jest-environment jsdom */
import Library from './library.js';
import List from './list.js';

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

  test('updating complete status', () => {
    const newlist = new List('hi');
    expect(newlist.completed).toBe(false);
    newlist.updateList();
    expect(newlist.completed).toBe(true);
  });
});