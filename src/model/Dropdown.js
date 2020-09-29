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
    this.boundAddItem = this.addItem.bind(this);
  }

  read() {
    this.list = [];
    const _this = this;

    if (this.showall) {
      let item = new DropdownItem( {element: this.element, id: "0", text: "Alle...", del: false} );
      this.list.push( item );
    }

    //TODO: Wrap in switch case on dropdown type:
    this.load = ProjectStatus.readAll();

    this.load.then( function(data) {
      var i;
      for ( i = 0; i < data.length; i++ ) {
        let item = new DropdownItem( {element: _this.element, id: data[i].id, text: data[i].name, del: true, type: _this.type} );
        _this.list.push( item );
      }
    })
    .then( () => {
      let dropdown = this.element.children[1];
      let header = dropdown.children[0];
      let headline = header.children[0];
      let items = dropdown.children[1].children[0];
      main.view.dropdown.setHeadlineText(headline, this);
      main.view.dropdown.fillList( items, this);
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
    let list = this.element.children[1].children[1];
    let display = list.style.display;
    if (display == "none") {
      list.style.display = "block";
    } else {
      list.style.display = "none";
    }
  }

  addItem() {
    let itemname = prompt("Indtast ny mulighed");
    if (itemname == null || itemname == "") { return; }

    //Wrap in switch case on dropdown type:
    let item = new ProjectStatus( {name: itemname} );

    let response = item.create();

    //When response is ready:
    response.then( (response) => {
      if (response.status === 201) {

        //Update list and view
        let dropdown = this.element.children[1];
        let list = dropdown.children[1];
        let items = list.children[0];
        main.view.dropdown.unfillList(items, this);
        this.read();

        //Change state to newly added option
        this.load.then( () => {
          let id = this.textToId(itemname);
          this.select(id);
        });
      }
    });
  }

  deleteItem(id, listElement) {
    //Wrap in switch case on type
    let item = new ProjectStatus( {id: id} );

    let responsecode = item.delete().then( (response) => {
      return response.status;
    });

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

    let changeEvt = new CustomEvent('statechange', {
      bubbles: true,
      detail: {
        dropdown: this.type,
        state: this.state
      }
    });
    this.element.dispatchEvent( changeEvt );
  }

  textToId(text) {
    const texts = this.list.map(el => {return el.text});
    const index = texts.indexOf( text );
    return this.list[index].id;
  }
}
