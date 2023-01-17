import './style.css';

const todoList = document.querySelector('#to_do_list');
const list = [
  {
    description: 'wash the dishes',
    completed: false,
    index: 1,
  },
  {
    description: 'complete to do list project',
    completed: false,
    index: 2,
  },
];

function showList() {
  list.forEach((i) => {
    todoList.innerHTML += `<div id="list${i.index}" class="todolist"><input type="checkbox"><input type="text" placeholder="${i.description}" class="listname"><i class="fa-solid fa-ellipsis-vertical"></i></div>`;
  });
}

window.onload = () => {
  showList();
};