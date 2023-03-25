import './style.css';
import Library from './library.js';
import {
  input, todoList, clearAll, reload, form, error, theme,
} from './variable.js';

window.onload = () => {
  const newLibrary = new Library();

  // change theme
  theme.onclick = () => {
    document.body.classList.toggle("dark-theme")
    if (document.body.classList.contains("dark-theme")) {
      theme.classList.remove("fa-moon")
      theme.classList.add("fa-sun")
    } else {
      theme.classList.add("fa-moon")
      theme.classList.remove("fa-sun")
    }
}

  // display lists
  newLibrary.showList();

  // add a list
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim() === '' || input.value.trim() === null) {
      error.textContent = 'Please fill a correct task';
    } else {
      newLibrary.addList(input.value);
      input.value = '';
    }
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