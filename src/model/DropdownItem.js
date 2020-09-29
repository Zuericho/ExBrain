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
