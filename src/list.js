class List {
  constructor(description, index, completed = false) {
    this.description = description;
    this.index = index;
    this.completed = completed;
  }

  updateList() {
    if (this.completed) {
      this.completed = false;
    } else {
      this.completed = true;
    }
  }
}

export default List;