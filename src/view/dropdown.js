main.view.dropdown = {
  setupUserInterface: async function() {
    var dropdownDiv = document.querySelector("div#dropdown");
    main.view.dropdown.setupDropdown( {element: dropdownDiv, type: "ProjectStatus", state: 0, headline: "Status: ", showall: true} );
  },

  setupDropdown: async function(slots) {
    let elem = slots.element;
    var instance = new CustomDropdown( slots );
main.ctrl.status = instance;
    var label = document.createElement("strong");
    var dropdown = document.createElement("div");
    var header = document.createElement("div");
    var list = document.createElement("div");
    elem.textContent = "";
    
    elem.appendChild(label);
    dropdown.appendChild(header);
    dropdown.appendChild(list);
    elem.appendChild(dropdown);

    main.view.dropdown.setupLabel(label, instance);
    await instance.load;
    main.view.dropdown.setupHeader(header, instance);
    main.view.dropdown.fillList(list, instance);

    elem.addEventListener( 'delete', e => { instance.boundDeleteItem(e.detail.id, e.detail.elem); e.stopPropagation() } );
    elem.addEventListener( 'option', e => { instance.boundSelect(e.detail.id); e.stopPropagation(); } );
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

    main.view.dropdown.setHeadlineText(headline, obj);
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
    main.view.dropdown.appendAddBtn( tbody, obj );
  },

  appendOption: function(el, option) {
    var row = el.insertRow();
    var cell = row.insertCell(-1)
    cell.textContent = option.text;
    var optionEvt = new CustomEvent('option', {bubbles: true, detail: {id: option.id} });
    cell.addEventListener('click', e => { row.dispatchEvent( optionEvt ) } );
    if (option.del) {
      var deletebtn = document.createElement("button");
      deletebtn.textContent = "x";
      var deleteEvt = new CustomEvent('delete', {bubbles: true, detail: {id: option.id, elem: row} });
      deletebtn.addEventListener('click', e => { row.dispatchEvent( deleteEvt ) } );
      row.insertCell(-1).appendChild(deletebtn);
    }
  },

  appendAddBtn: function(el, obj) {
    var addbtn = document.createElement("button");
    addbtn.textContent = "+";
    addbtn.addEventListener('click', obj.addItem );
    var row = el.insertRow();
    row.insertCell(-1).appendChild(addbtn);
  }
};
