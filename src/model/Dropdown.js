class CustomDropdown {

  constructor( slots) {
    this.element = slots.element;
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
    //TODO: Update view
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

  deleteItem(id, listElement) {
    const item = this.itemOfId(id);
    let responsecode = item.delete();

    //When response is ready:
    responsecode.then( (code) => {
      if (code === 200) {
        //Update list
        const index = this.indexOfId(id);
        this.list.splice( index, 1);

        //Update view
        listElement.remove();
      }
    });
  }

  select(id) {
    this.state = id;

    //Update view
    let dropdown = this.element.children[1];
    let header = dropdown.children[0];
    let headline = header.children[0];
    main.view.dropdown.setHeadlineText(headline, this);

    //TODO: Fire event on changestate
  }
}
