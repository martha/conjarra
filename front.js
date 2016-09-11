requestVerb();

function requestVerb() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      if (data.length == 0) { return; }
      document.getElementById("verbo").innerHTML = data.infinitive;
      document.getElementById("persona").innerHTML = verbosePerson(data.persona);
    }
  };

  xhttp.open("GET", "/random", true);
  xhttp.send();
}

function verbosePerson(persona) {
  var imperativosEl = document.getElementById("imperativos");
  switch(persona) {
    case '1s': 
      imperativosEl.style.display = "none";
      return 'yo (1ª persona singular)';
    case '2s': 
      imperativosEl.style.display = "block";
      return 'tú (2ª persona singular)';
    case '3s':
      imperativosEl.style.display = "block";
      return 'el (3ª persona singular)';
    case '1p':
      imperativosEl.style.display = "none";
      return 'nosotros (1ª persona plural)';
    case '2p':
      imperativosEl.style.display = "block";
      return 'vosotros (2ª persona plural)';
    case '3p':
      imperativosEl.style.display = "block";
      return 'ellos (3ª persona plural)';
  }
}