class CustomDropdown {

  constructor( slots) {
    this.type = slots.type;
    this.state = slots.state;
    this.headline = slots.headline;
    this.showall = slots.showall;
    this.list = [];
    this.read();
    this.boundDeleteItem = this.deleteItem.bind(this);
    this.boundSelect = this.select.bind(this);
  }

  read() {
    const _this = this;

    if (this.showall) {
      let item = new DropdownItem( {id: "0", text: "Alle...", del: false} );
      this.list.push( item );
    }

    //TODO: Wrap in switch case on dropdown type:
    this.load = ProjectStatus.readAll();

    this.load.then( function(data) {
      var i;
      for ( i = 0; i < data.length; i++ ) {
        let item = new DropdownItem( {id: data[i].id, text: data[i].name, del: true, type: _this.type} );
        _this.list.push( item );
      }
    });
  }

  indexOfId(id) {
    const ids = this.list.map(el => {return el.id});
    const index = ids.indexOf( id.toString() );
    return index;
  }

  itemOfId(id) {
    const ids = this.list.map(el => {return el.id});
    const index = ids.indexOf( id.toString() );
    return this.list[index];
  }

  toggle() {
    alert( "Dropdown " + this.headline + " was toggled!" );
    //Update view
  }

  addItem() {
    let itemname = "Test"; //TODO Remove hardcoding

    //Wrap in switch case on dropdown type:
    let item = new ProjectStatus( {name: itemname} );

    item.create();

    //Update list
//    const index = this.indexOfId(id);
//    this.list.splice( index, 1);

    //Update view
  }

  deleteItem(id) {
    alert("Dropdown deleteItem: " + id);
    const item = this.itemOfId(id);
    item.delete();

    //Update list
//    const index = this.indexOfId(id);
//    this.list.splice( index, 1);

    //Update view
  }

  select(id) {
    alert("Dropdown select: " + id);
    this.state = id;

    //Update view

    //Fire event on changestate
  }
}
