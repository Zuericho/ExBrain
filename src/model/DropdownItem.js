class DropdownItem {

  constructor( slots) {
    this.element = document.createElement("tr");
    this.id = slots.id;
    this.text = slots.text;
    this.del = slots.del;
    this.type = slots.type;
    this.boundSelect = this.select.bind(this);
    this.boundDelete = this.delete.bind(this);
  }

  setupUI() {
    let row = this.element;
      let cell = row.insertCell(-1)
        cell.textContent = this.text;
        cell.addEventListener('click', this.boundSelect );

    if (this.del) {
      let deletebtn = document.createElement("button");
        deletebtn.textContent = "x";
        deletebtn.addEventListener('click', this.boundDelete );
      row.insertCell(-1).appendChild(deletebtn);
    }
  }

  unsetUI() {
    let row = this.element;
      let optioncell = row.children[0];
      let deletecell = row.children[1];

    //Remove event listeners
    optioncell.removeEventListener('click', this.boundSelect);

    if(this.del) {
      let deletebtn = deletecell.children[0];
      deletebtn.removeEventListener('click', this.boundDelete );
    }

    //Remove text content
    row.textContent = "";
  }

  select() {
    const event = new CustomEvent('select', {
      bubbles: true,
      detail: {id: this.id}
    });
    this.element.dispatchEvent( event );
  }

  delete() {
      var deleteEvt = new CustomEvent('delete', {
        bubbles: true,
        detail: {
          id: this.id,
          elem: this.element
        }
      });
      this.element.dispatchEvent( deleteEvt );
  }
}
