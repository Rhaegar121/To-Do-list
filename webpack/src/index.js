import './style.css';
import Library from './library.js';

const input = document.querySelector('#input_list');
const todoList = document.querySelector('#to_do_list');
const clearAll = document.querySelector('#clear_all');

window.onload = () => {
  const newLibrary = new Library();
  newLibrary.showList();

  input.onkeypress = (e) => {
    if (e.keyCode === 13) {
      newLibrary.addList();
    }
  };

  todoList.onclick = (e) => {
    if (e.target.className.includes('fa-trash-can')) {
      const data = e.target;
      newLibrary.removeList(data);
    }
  };

  clearAll.onclick = () => {
    newLibrary.clearAllCompleted();
  };
};