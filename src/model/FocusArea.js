class FocusArea {

  static api = "http://localhost/dev2/api/objects/focusarea/";

  constructor( slots) {
    this.name = slots.name;
    this.id = slots.id;
    this.boundDelete = this.delete.bind(this);
  }

  create() {
    const api = FocusArea.api + "create.php";
    const data = { name: this.name };
    return fetch( api, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      return response;
    })
    .catch( (error) => {
      alert("Error: " + error);
    });
  }

  static readAll() {
    const api = FocusArea.api + "read.php";
    let promise = fetch(api)
    .then( function(response) {
      return response.json();
    })
    .then( function(data) {
      let list = [];
      var i;
      for ( i = 0; i < data.records.length; i++ ) {
        let item = new ProjectStatus( data.records[i] );
        list.push(item);
      };
      return list;
    });
    return promise;
  }

  delete() {
    const api = FocusArea.api + "delete.php";
    const data = { id: this.id };
    return fetch( api, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .catch( (error) => {
      alert("Error: " + error);
    });
  }

}
