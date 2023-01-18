import List from './list.js';
import './style.css';

const input = document.querySelector('#input_list');
const todoList = document.querySelector('#to_do_list');

class Library {
  constructor() {
    this.Library = JSON.parse(localStorage.getItem('todolist')) || [];
  }

  addList() {
    const newList = new List();
    newList.description = input.value;
    newList.completed = false;
    newList.index = this.Library.length + 1;
    this.Library.push(newList);
    localStorage.setItem('todolist', JSON.stringify(this.Library));
    this.showList();
    input.value = '';
  }

  showList() {
    todoList.innerHTML = '';
    this.Library.sort((a, b) => a.index - b.index);
    this.Library.forEach((todolist, i) => {
      if (todolist.completed === true) {
        todoList.innerHTML += `<div id="${i}" class="todolist">
        <input type="checkbox" id="${todolist.index}" class="check" value="${todolist.completed}" checked>
        <input type="text" id="${todolist.index}" value="${todolist.description}" class="listname">
        <i id="${todolist.index}" class="fa-regular fa-trash-can"></i>
        </div>`;
      } else {
        todoList.innerHTML += `<div id="${i}" class="todolist">
        <input type="checkbox" id="${todolist.index}" class="check" value="${todolist.completed}">
        <input type="text" id="${todolist.index}" value="${todolist.description}" class="listname">
        <i id="${todolist.index}" class="fa-regular fa-trash-can"></i>
        </div>`;
      }
    });
    localStorage.setItem('todolist', JSON.stringify(this.Library));
    this.editList();
    this.checkList();
  }

  removeList(list) {
    list.parentElement.remove();
    this.Library = this.Library.filter((todolist, i) => i !== Number(list.parentElement.id));
    this.indexList();
    localStorage.setItem('todolist', JSON.stringify(this.Library));
    this.showList();
  }

  indexList() {
    for (let i = 0; i < this.Library.length; i += 1) {
      this.Library[i].index = this.Library.indexOf(this.Library[i]) + 1;
    }
  }

  editList() {
    const listname = document.querySelectorAll('.listname');
    listname.forEach((list, index) => {
      list.addEventListener('input', () => {
        this.Library[index].description = list.value;
        localStorage.setItem('todolist', JSON.stringify(this.Library));
      });
    });
  }

  checkList() {
    const check = document.querySelectorAll('.check');
    check.forEach((checkbox, index) => {
      checkbox.addEventListener('change', () => {
        if (this.Library[index].completed === true) {
          this.Library[index].completed = false;
          check[index].nextElementSibling.style.textDecoration = 'none';
        } else {
          this.Library[index].completed = true;
          check[index].nextElementSibling.style.textDecoration = 'line-through';
        }
        localStorage.setItem('todolist', JSON.stringify(this.Library));
      });
    });
  }

  clearAllCompleted() {
    this.Library = this.Library.filter((list) => list.completed === false);
    this.indexList();
    localStorage.setItem('todolist', JSON.stringify(this.Library));
    this.showList();
  }
}

export default Library;