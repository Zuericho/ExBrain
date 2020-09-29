main.view.dropdown = {
  setupUserInterface: async function() {
    var dropdownDiv = document.querySelector("div#dropdown");
    main.view.dropdown.setupDropdown( {element: dropdownDiv, type: "ProjectStatus", state: 0, headline: "Status: ", showall: true} );
    document.addEventListener('statechange', e => {alert("Dropdown " + e.detail.dropdown + " changed state to " + e.detail.state)});
  },

  setupDropdown: async function(slots) {
    let elem = slots.element;
    var instance = new CustomDropdown( slots );
main.ctrl.status = instance;
    var label = document.createElement("strong");
    var dropdown = document.createElement("div");
    var header = document.createElement("div");
    var list = document.createElement("div");
    var items = document.createElement("div");
    var add = document.createElement("div");
    elem.textContent = "";
    
    elem.appendChild(label);
    dropdown.appendChild(header);
    dropdown.appendChild(list);
    list.appendChild(items);
    list.appendChild(add);
    elem.appendChild(dropdown);

    main.view.dropdown.setupLabel(label, instance);
    main.view.dropdown.setupHeader(header, instance);
    main.view.dropdown.appendAddBtn(add, instance);

    elem.addEventListener( 'delete', e => { instance.boundDeleteItem(e.detail.id, e.detail.elem); e.stopPropagation() } );
    elem.addEventListener( 'select', e => { instance.boundSelect(e.detail.id); e.stopPropagation(); } );
  },

  setupLabel: function(el, obj) {
    var headlinetext = document.createTextNode( obj.headline );
    el.appendChild(headlinetext);
  },

  setupHeader: function(el, obj) {
    var headline = document.createElement("div");
    var togglebtn = document.createElement("button");
    togglebtn.append("v");

    el.append(headline);
    el.append(togglebtn);

    togglebtn.addEventListener('click', event => {  obj.toggle() } );
  },

  setHeadlineText: function(el, obj) {
    var text = obj.itemOfId( obj.state ).text;
    el.textContent = text;
  },

  fillList: function(el, obj) {
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);
    el.appendChild(table);
    var i;
    for ( i=0; i<obj.list.length; i++) {
      main.view.dropdown.appendOption( tbody, obj.list[i] );
    }
  },

  appendOption: function(el, option) {
    var row = el.appendChild(option.element);
    var cell = row.insertCell(-1)
    cell.textContent = option.text;
    cell.addEventListener('click', option.boundSelect );
    if (option.del) {
      var deletebtn = document.createElement("button");
      deletebtn.textContent = "x";
      deletebtn.addEventListener('click', option.boundDelete );
      row.insertCell(-1).appendChild(deletebtn);
    }
  },

  appendAddBtn: function(el, obj) {
    var addbtn = document.createElement("button");
    addbtn.textContent = "+";
    addbtn.addEventListener('click', obj.boundAddItem );
    el.appendChild(addbtn);
  },

  unfillList: function(el, obj) {
    let table = el.children[0];
    let tbody = table.children[0];
    for (i=0; i<obj.list.length; i++) {
      let item = obj.list[i];
      let child = obj.list[i].element;
      //Looping through list options.
      let option = child.children[0];
      option.removeEventListener('click', item.boundSelect);
      if (item.del) {
        let btn = child.children[1].children[0];
        btn.removeEventListener('click', item.boundDelete);
      }
    }
    el.textContent = "";//Delete content of el
  }
};
