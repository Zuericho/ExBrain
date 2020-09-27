class CustomDropdown {

  constructor( slots) {
    this.table = slots.table;
    this.state = slots.state;
    this.headline = slots.headline;
    this.showall = slots.showall;
    this.list = [];
    this.read();
  }

  read() {
    const _this = this;

    this.list = [];
    if (this.showall) {
      this.list.push( {id: "0", name: "Alle..." } );
    }

    //Wrap in swtch case on dropdown type:
    this.load = ProjectStatus.readAll();

    this.load.then( function(data) {
      var i;
      for ( i = 0; i < data.length; i++ ) {
        _this.list.push(data[i]);
      }
    });
  }

  nameOfId(id) {
    const ids = this.list.map(el => el.id);
    const index = ids.indexOf( id.toString() );
    const name = this.list[index].name;
    return name;
  }

  toggle() {
    alert( "Dropdown " + this.headline + " was toggled!" );
  }

  addItem() {
    let itemname = "Test";

    //Wrap in switch case on dropdown type:
    let item = new ProjectStatus( {name: itemname} );

    item.create();

    //Update this.list
    //Update view
  }

}
