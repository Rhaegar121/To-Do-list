import List from "./list";

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
            todoList.innerHTML += `<div id="${i}" class="todolist"><input type="checkbox" value="${todolist.completed}"><input type="text" id="${todolist.index}" value="${todolist.description}" class="listname"><i id="${todolist.index}" class="fa-regular fa-trash-can"></i></div>`;
          });
          this.editList();
    }

    removeList(list) {
        list.parentElement.remove();
        this.Library = this.Library.filter((todolist, i) => i !== Number(list.parentElement.id));
        for (let i = 0; i < this.Library.length; i += 1) {
            this.Library[i].index = this.Library.indexOf(this.Library[i]) + 1;
          }
        localStorage.setItem('todolist', JSON.stringify(this.Library));
        this.showList(); 
    }

    editList() {
        const listname = document.querySelectorAll('.listname');
         listname.forEach((list, index) => {
            list.addEventListener('input', () => {
                this.Library[index].description = list.value;
                localStorage.setItem('todolist', JSON.stringify(this.Library)); 
            })
         })
    }
}

export default Library;