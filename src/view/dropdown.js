main.view.dropdown = {
  setupUserInterface: async function() {
    main.view.dropdown.setupDropdown( {type: "ProjectStatus", state: 0, headline: "Status: ", showall: true} );
  },

  setupDropdown: async function(slots) {
    var instance = new CustomDropdown( slots );
main.ctrl.status = instance;
    var dropdownDiv = document.querySelector("div#dropdown");
    var label = document.createElement("strong");
    var dropdown = document.createElement("div");
    var list = document.createElement("div");
    dropdownDiv.textContent = "";
    
    dropdownDiv.appendChild(label);
    dropdown.appendChild(list);
    dropdownDiv.appendChild(dropdown);

    main.view.dropdown.setupLabel(label, instance);
    await instance.load;
    main.view.dropdown.setupHeader(dropdown, instance);
    main.view.dropdown.fillList(list, instance);

    dropdownDiv.addEventListener( 'delete', e => { instance.boundDeleteItem(e.detail); e.stopPropagation() } );
    dropdownDiv.addEventListener( 'option', e => { instance.boundSelect(e.detail); e.stopPropagation(); } );
  },

  setupLabel: function(el, obj) {
    var headlinetext = document.createTextNode( obj.headline );
    el.appendChild(headlinetext);
  },

  setupHeader: function(el, obj) {
    var text = obj.itemOfId( obj.state ).text;
    var togglebtn = document.createElement("button");
    togglebtn.append("v");
    el.prepend(togglebtn);
    el.prepend(text);
    togglebtn.addEventListener('click', event => {  obj.toggle() } );
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
    var optionEvt = new CustomEvent('option', {bubbles: true, detail: option.id});
    cell.addEventListener('click', e => { row.dispatchEvent( optionEvt ) } );
    if (option.del) {
      var deletebtn = document.createElement("button");
      deletebtn.textContent = "x";
      var deleteEvt = new CustomEvent('delete', {bubbles: true, detail: option.id});
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
