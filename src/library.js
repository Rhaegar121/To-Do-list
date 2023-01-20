import List from './list.js';
import './style.css';
import { input, todoList } from './variable.js';

class Library {
  constructor() {
    this.Library = JSON.parse(localStorage.getItem('todolist')) || [];
  }

  // add a list
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

  // display lists
  showList() {
    todoList.innerHTML = '';
    this.Library.sort((a, b) => a.index - b.index);
    this.Library.forEach((todolist, i) => {
      todoList.innerHTML += `<div id="${i}" class="todolist">
        <input type="checkbox" id="${todolist.index}" class="check" value="${todolist.completed}" ${todolist.completed === true ? 'checked' : ''}>
        <input type="text" id="${todolist.index}" value="${todolist.description}" class="listname">
        <i id="${todolist.index}" class="fa-regular fa-trash-can"></i>
        </div>`;
    });
    localStorage.setItem('todolist', JSON.stringify(this.Library));
    this.editList();
    this.checkList();
  }

  // remove a list
  removeList(list) {
    list.parentElement.remove();
    this.Library = this.Library.filter((todolist, i) => i !== Number(list.parentElement.id));
    this.indexList();
    localStorage.setItem('todolist', JSON.stringify(this.Library));
    this.showList();
  }

  // rearrange the index
  indexList() {
    for (let i = 0; i < this.Library.length; i += 1) {
      this.Library[i].index = this.Library.indexOf(this.Library[i]) + 1;
    }
  }

  // edit a list
  editList() {
    const listname = document.querySelectorAll('.listname');
    listname.forEach((list, index) => {
      list.addEventListener('input', () => {
        this.Library[index].description = list.value;
        localStorage.setItem('todolist', JSON.stringify(this.Library));
      });
    });
  }

  // check a list
  checkList() {
    const check = document.querySelectorAll('.check');
    check.forEach((checkbox, index) => {
      checkbox.addEventListener('change', () => {
        if (this.Library[index].completed === true) {
          this.Library[index].completed = false;
          check[index].nextElementSibling.style.textDecoration = 'none';
          check[index].nextElementSibling.style.color = '#A0522D';
        } else {
          this.Library[index].completed = true;
          check[index].nextElementSibling.style.textDecoration = 'line-through';
          check[index].nextElementSibling.style.color = '#DC143C';
        }
        localStorage.setItem('todolist', JSON.stringify(this.Library));
      });
    });
  }

  // clear all checked lists
  clearAllCompleted() {
    this.Library = this.Library.filter((list) => list.completed === false);
    this.indexList();
    localStorage.setItem('todolist', JSON.stringify(this.Library));
    this.showList();
  }
}

export default Library;