import './style.css';
import Library from './library.js';
import { input, todoList, clearAll } from './variable.js';

window.onload = () => {
  const newLibrary = new Library();

  // display lists
  newLibrary.showList();

  // add a list
  input.onkeypress = (e) => {
    if (e.keyCode === 13) {
      newLibrary.addList();
    }
  };

  // remove a list
  todoList.onclick = (e) => {
    if (e.target.className.includes('fa-trash-can')) {
      const data = e.target;
      newLibrary.removeList(data);
    }
  };

  // clear all checked lists
  clearAll.onclick = () => {
    newLibrary.clearAllCompleted();
  };
};