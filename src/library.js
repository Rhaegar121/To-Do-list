import List from './list.js';

class Library {
  constructor() {
    this.Library = JSON.parse(localStorage.getItem('todolist')) || [];
  }

  // add a list
  addList(descp) {
    const newList = new List();
    newList.description = descp;
    newList.completed = false;
    newList.index = this.Library.length + 1;
    this.Library.push(newList);
    localStorage.setItem('todolist', JSON.stringify(this.Library));
    this.showList();
  }

  // display lists
  showList() {
    document.querySelector('#to_do_list').innerHTML = '';
    this.Library.forEach((todolist, i) => {
      document.querySelector('#to_do_list').innerHTML += `<div id="${i}" class="todolist">
        <input type="checkbox" id="${todolist.index}" class="check" value="${todolist.completed}" ${todolist.completed === true ? 'checked' : ''}>
        <input type="text" id="${todolist.index}" value="${todolist.description}" class="listname">
        <i id="${todolist.index}" class="fa-regular fa-trash-can"></i>
        </div>`;
    });
    localStorage.setItem('todolist', JSON.stringify(this.Library));

    // edit list description
    const listname = document.querySelectorAll('.listname');
    listname.forEach((list, index) => {
      list.addEventListener('input', () => {
        const descp = list.value;
        this.editList(descp, index);
        localStorage.setItem('todolist', JSON.stringify(this.Library));
      });
    });

    // update check list
    const check = document.querySelectorAll('.check');
    check.forEach((checkbox, index) => {
      checkbox.addEventListener('change', () => {
        this.checkList(index);
        localStorage.setItem('todolist', JSON.stringify(this.Library));
      });
    });
  }

  // remove a list
  removeList(number) {
    this.Library = this.Library.filter((todolist, i) => i !== Number(number));
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
  editList(descp, index) {
    this.Library[index].description = descp;
    localStorage.setItem('todolist', JSON.stringify(this.Library));
  }

  // check a list
  checkList(index) {
    const check = document.querySelectorAll('.check');
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