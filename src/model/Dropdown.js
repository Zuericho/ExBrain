class CustomDropdown {

  constructor( slots) {
    this.boundDeleteEventHandler = this.deleteEventHandler.bind(this);
    this.boundSelectEventHandler = this.selectEventHandler.bind(this);
    this.boundAddItem = this.addItem.bind(this);
    this.boundToggle = this.toggle.bind(this);

    this.element = slots.element;
    this.type = slots.type;
    this.state = slots.state;
    this.headline = slots.headline;
    this.showall = slots.showall;
    this.list;
    this.listelement;
    this.listcontainer;
    this.headlineelement;

    this.setupUI();
    this.read();
  }

  setupUI() {
    this.element.textContent = "";

    //Create internal HTML elements
    let label = document.createElement("strong");
    let dropdown = document.createElement("div");
      let header = document.createElement("div");
        let headline = document.createElement("div");
        let togglebtn = document.createElement("button");
      let list = document.createElement("div");
        let items = document.createElement("div");
          let table = document.createElement("table");
            let tbody = document.createElement("tbody");
        let add = document.createElement("div");
          let addbtn = document.createElement("button");

    //Setup element hierarchy
    this.element.appendChild(label);
      label.textContent = this.headline;
    this.element.appendChild(dropdown);
      dropdown.appendChild(header);
        header.append(headline);
        header.append(togglebtn);
          togglebtn.append("v");
      dropdown.appendChild(list);
        list.appendChild(items);
          items.appendChild(table);
            table.appendChild(tbody);
        list.appendChild(add);
          add.appendChild(addbtn);
            addbtn.textContent = "+";

    //Layout the elements
    list.style.position = "absolute";
    list.style.background = "gainsboro";
    dropdown.style.display = "inline-block";
    headline.style.display = "inline-block";
    header.style.border = "inset";

    //Add event listeners
    togglebtn.addEventListener('click', this.boundToggle );
    addbtn.addEventListener('click', this.boundAddItem );
    this.element.addEventListener( 'delete', this.boundDeleteEventHandler );
    this.element.addEventListener( 'select', this.boundSelectEventHandler );

    //Store elements for internal parsings
    this.listelement = list;
    this.listcontainer = tbody;
    this.headlineelement = headline;

    //Initiate view of dropdown
    this.hide();

 }

//TODO: Write method "unsetUI()"

  read() {
    this.list = [];
    const _this = this;

    if (this.showall) {
      let parameters = {
        id: "0",
        text: "Alle...",
        del: false
      };
      let item = new DropdownItem( parameters );
      this.list.push( item );
    }

    let content;
    switch (this.type) {
      case 'ProjectStatus':
        content = ProjectStatus.readAll();
        break;
      case 'Context':
        content = Context.readAll();
        break;
      case 'MaybeCategory':
        content = MaybeCategory.readAll();
        break;
      case 'FocusArea':
        content = FocusArea.readAll();
        break;
    }

    content.then( function(data) {
      var i;
      for ( i = 0; i < data.length; i++ ) {
        let parameters = {
          id: data[i].id,
          text: data[i].name,
          del: true,
          type: _this.type
        };
        let item = new DropdownItem( parameters );
        _this.list.push( item );
      }
    })
    .then( () => {
      this.setHeadlineText();
      _this.fillList();
    });
    return content;
  }

  hide() {
    let list = this.listelement;
    list.style.display = "none";
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

  show() {
    let list = this.listelement;
    list.style.display = "block";
  }

  toggle() {
    let list = this.listelement;
    let display = list.style.display;
    if (display == "none") {
      this.show();
    } else {
      this.hide();
    }
  }

  //TODO: Prevent creation of option with name identical to existing name
  addItem() {
    let itemname = prompt("Indtast ny mulighed");
    if (itemname == null || itemname == "") { return; }

    let item;
    switch (this.type) {
      case 'ProjectStatus':
        item = new ProjectStatus( {name: itemname} );
        break;
      case 'Context':
        item = new Context( {name: itemname} );
        break;
      case 'MaybeCategory':
        item = new MaybeCategory( {name: itemname} );
        break;
      case 'FocusArea':
        item = new FocusArea( {name: itemname} );
        break;
    }

    let response = item.create();

    //When response is ready:
    response.then( (response) => {
      if (response.status === 201) {

        //Update list and view
        this.unfillList();
        let content = this.read();

        //Change state to newly added option
        content.then( () => {
          let id = this.textToId(itemname);
          this.select(id);
        });

        //Hide list
        this.hide();
      }
    });
  }

  deleteEventHandler(event) {
    event.stopPropagation();
    let id = event.detail.id;
    let listElement = event.detail.elem;
    this.deleteItem(id, listElement);
  }

  deleteItem(id, listElement) {
    if (id == this.state) {
    //Alert user, do not delete
      alert("Fejl: Det er ikke tilladt at slette den aktive mulighed.");
      return;
    }

    let item
    switch (this.type) {
      case 'ProjectStatus':
        item = new ProjectStatus( {id: id} );
        break;
      case 'Context':
        item = new Context( {id: id} );
        break;
      case 'MaybeCategory':
        item = new MaybeCategory( {id: id} );
        break;
      case 'FocusArea':
        item = new FocusArea( {id: id} );
        break;
    }

    let responsecode = item.delete().then( (response) => {
      return response.status;
    });

    //When response is ready:
    responsecode.then( (code) => {
      if (code === 200) {
        //Lookup index
        const index = this.indexOfId(id);

        //Update view
        let item = this.list[index];
        item.unsetUI();
        item.element.remove();

        //Update list
        this.list.splice( index, 1);
      }
    });
  }

  selectEventHandler(event) {
    event.stopPropagation();
    let id = event.detail.id;
    this.select(id);
  }

  select(id) {
    this.state = id;

    //Update view
    this.setHeadlineText();

    //Hide list
    this.hide();

    //Emmit statechange event
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

  setHeadlineText() {
    var text = this.itemOfId( this.state ).text;
    this.headlineelement.textContent = text;
  }

  fillList() {
    var i;
    for ( i=0; i<this.list.length; i++) {
      this.appendOption( this.list[i] );
    }
  }

  appendOption( option ) {
    option.setupUI();
    this.listcontainer.appendChild(option.element);
  }

  unfillList() {
    let tbody = this.listcontainer;
    let i;
    for (i=0; i<this.list.length; i++) {
      let item = this.list[i];
      item.unsetUI();
    }

    //Delete content of listcontainer
    tbody.textContent = "";
  }
}
