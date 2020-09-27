main.view.dropdown = {
  setupUserInterface: async function() {

    var dropdownDiv = document.querySelector("div#dropdown");
    var status = new CustomDropdown( {table: "projectstatus", state: 0, headline: "Status: ", showall: true} );
main.ctrl.status = status;

    var headline = document.createElement("strong");
    var headlinetext = document.createTextNode(status.headline);
    headline.appendChild(headlinetext);

    var dropdown = document.createElement("div");
    var statustext = document.createTextNode( status.nameOfId( status.state ) );
    var dropdowntogglebtn = document.createElement("button");
    var dropdownbtntext = document.createTextNode("v");
    dropdowntogglebtn.addEventListener('click', event => {  status.toggle() } );
    dropdowntogglebtn.appendChild(dropdownbtntext);
    dropdown.appendChild(statustext);
    dropdown.appendChild(dropdowntogglebtn);

    var list = document.createElement("div");
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");
    await status.load;
    var i;
    for ( i=0; i<status.list.length; i++ ) {
      var row = tbody.insertRow();
      row.insertCell(-1).textContent = status.list[i].name;
      if (status.list[i].id != 0) {
        var deletebtn = document.createElement("button");
        deletebtn.textContent = "x";
        deletebtn.addEventListener('click', status.list[i].boundDelete );
        row.insertCell(-1).appendChild(deletebtn);
      }
    }
    var addbtn = document.createElement("button");
    addbtn.textContent = "+";
    addbtn.addEventListener('click', status.addItem );
    var row = tbody.insertRow();
    row.insertCell(-1).appendChild(addbtn);
var cell = row.insertCell(-1);
cell.textContent ="Click this text";
cell.addEventListener('click', event => {alert("Click event from cell")} );
    table.appendChild(tbody);
    list.appendChild(table);

    dropdownDiv.appendChild(headline);
    dropdownDiv.appendChild(dropdown);
    dropdown.appendChild(list);
  },

  showList: function(status) {
    console.log(status);
  }
};
