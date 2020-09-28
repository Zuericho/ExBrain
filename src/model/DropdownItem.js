class DropdownItem {

  constructor( slots) {
    this.id = slots.id;
    this.text = slots.text;
    this.del = slots.del;
    this.type = slots.type;
  }

  //Not in use
  select() {
    const event = new CustomEvent('select', {
      bubbles: true,
      detail: {text: this.text}
    });
    this.dispatchEvent( event );
  }

  delete() {
    alert( "Delete called on DropdownItem. Id is " + this.id );
    //Wrap in switch case on type
    let item = new ProjectStatus( {id: this.id} );

    item.delete();
  }
}
