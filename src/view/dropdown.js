main.view.dropdown = {
  setupUserInterface: async function() {
    var dropdownStatus = document.querySelector("div#dropdownStatus");
    new CustomDropdown( {element: dropdownStatus, type: "ProjectStatus", state: 0, headline: "Status: ", showall: true} );

    var dropdownFocus = document.querySelector("div#dropdownFocus");
    new CustomDropdown( {element: dropdownFocus, type: "FocusArea", state: 0, headline: "Fokusområde: ", showall: true} );

    var dropdownCategory = document.querySelector("div#dropdownCategory");
    new CustomDropdown( {element: dropdownCategory, type: "MaybeCategory", state: 0, headline: "Kategori: ", showall: true} );

    var dropdownContext = document.querySelector("div#dropdownContext");
    new CustomDropdown( {element: dropdownContext, type: "Context", state: 0, headline: "Kontekst: ", showall: true} );

    document.addEventListener('statechange', e => {alert("Dropdown " + e.detail.dropdown + " changed state to " + e.detail.state)});
  }
};
