document.addEventListener("DOMContentLoaded", function(event) {
  requestVerb();

  document.getElementById("empezar").onclick = function() {
    document.getElementById("prueba").style.display = "block";
    document.getElementById("empezar").style.display = "none";
  };

  document.getElementById("verbForm").onsubmit = function(event) {
    event.preventDefault();
    document.getElementById("enviar").style.display = "none";
    document.getElementById("volver").style.display = "block";
    ajaxPost(this, displayResults);
  };

  document.getElementById("volver").onclick = function() {
    location.reload();
  }
});

function requestVerb() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      if (data.length == 0) { return; }
      document.getElementById("verbInput").value = data.infinitive;
      document.getElementById("verbo").innerHTML = data.infinitive;
      document.getElementById("personInput").value = data.persona;
      document.getElementById("persona").innerHTML = verbose(data.persona);
    }
  };

  xhttp.open("GET", "/random", true);
  xhttp.send();
}

function verbose(persona) {
  var element = document.getElementById("imperativos");
  switch(persona) {
    case '1s': 
      element.style.display = "none";
      return 'yo (1ª persona singular)';
    case '2s': 
      element.style.display = "block";
      return 'tú (2ª persona singular)';
    case '3s':
      element.style.display = "block";
      return 'el (3ª persona singular)';
    case '1p':
      element.style.display = "none";
      return 'nosotros (1ª persona plural)';
    case '2p':
      element.style.display = "block";
      return 'vosotros (2ª persona plural)';
    case '3p':
      element.style.display = "block";
      return 'ellos (3ª persona plural)';
  }
}

function ajaxPost(form, callback) {
  var url = form.action,
      xhr = new XMLHttpRequest(),
      data = {};

  var elements = form.elements;

  for (element in elements) {
    if (element.id == "enviar") {
      continue;
    }
    data[element.name] = element.value;
  }

  xhr.open("POST", url);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onload = callback.bind(xhr); 
  xhr.send(JSON.stringify(data));
}

function displayResults(results) {
  results = JSON.parse(results.target.response);
  var keys = Object.keys(results);
  if (keys.length == 0) {
    document.getElementById("éxito").innerHTML = "Todos correctos :)"
    return;
  }

  for (key in keys) {
    var answer = results[key];
    var element = document.getElementById(key);
    element.value = answer;
    element.className += "incorrecto";
  }
}
