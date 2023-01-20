import './style.css';
import Library from './library.js';
import {
  input, todoList, clearAll, reload, form,
} from './variable.js';

window.onload = () => {
  const newLibrary = new Library();

  // display lists
  newLibrary.showList();

  // add a list
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim() !== '') {
      input.onkeypress = (e) => {
        if (e.keyCode === 13) {
          newLibrary.addList();
        }
      };
    }
  });

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

reload.onclick = () => window.location.reload();