import './style.css';
import Library from './library.js';
import {
  input, todoList, clearAll, reload, form, error,
} from './variable.js';

window.onload = () => {
  const newLibrary = new Library();

  // display lists
  newLibrary.showList();

  // add a list
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim() === '' || input.value.trim() === null) {
      error.textContent = 'Please fill a correct task';
    } else newLibrary.addList(input.value);
    input.onkeypress = () => {
      input.parentElement.querySelector('#error').textContent = '';
    };
  });

  // remove a list
  todoList.onclick = (e) => {
    if (e.target.className.includes('fa-trash-can')) {
      const number = e.target.parentElement.id;
      newLibrary.removeList(number);
    }
  };

  // clear all checked lists
  clearAll.onclick = () => newLibrary.clearAllCompleted();
};

reload.onclick = () => window.location.reload();