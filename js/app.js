console.log("sanity check");
const requestResourceButton = document.getElementById("requestResourceButton");
requestResourceButton.addEventListener("click", function() {
  const resourceType = document.getElementById("resourceType").value;
  const resourceId = document.getElementById("resourceId").value;
  displayRequests(resourceType, resourceId);
});

function displayRequests(resourceType, resourceId) {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function() {
    const contentContainer = document.getElementById("contentContainer");

    if (resourceType === "people") {
      const data = JSON.parse(this.responseText);
      console.log(data);
      const peopleName = document.createElement("h2");
      peopleName.id = "peopleName";
      peopleName.innerHTML = "Name: " + data.name;
      contentContainer.appendChild(peopleName);

      const peopleGender = document.createElement("p");
      peopleGender.id = "peopleGender";
      peopleGender.innerHTML = "Gender: " + data.gender;
      contentContainer.appendChild(peopleGender);

      console.log("data species: " + data.species[0]);

      const oReqSpecies = new XMLHttpRequest();
      oReqSpecies.addEventListener("load", function() {
        const speciesData = JSON.parse(this.responseText);
        const speciesName = document.createElement("p");
        speciesName.id = "speciesName";
        speciesName.innerHTML = "Species: " + speciesData.name;
        contentContainer.appendChild(speciesName);
      });

      oReqSpecies.open("GET", data.species[0]);
      oReqSpecies.send();
    } else if (resourceType === "planets") {
      const data = JSON.parse(this.responseText);
      console.log(data);
      const planetName = document.createElement("h2");
      planetName.id = "planetName";
      planetName.innerHTML = "Name: " + data.name;
      contentContainer.appendChild(planetName);

      const planetTerrain = document.createElement("p");
      planetTerrain.id = "planetTerrain";
      planetTerrain.innerHTML = "Terrain: " + data.terrain;
      contentContainer.appendChild(planetTerrain);

      const planetPopulation = document.createElement("p");
      planetPopulation.id = "planetPopulation";
      planetPopulation.innerHTML = "Population: " + data.population;
      contentContainer.appendChild(planetPopulation);
    }
  });

  if (resourceType === "people") {
    oReq.open("GET", "https://swapi.co/api/people/" + resourceId + "/");
  } else if (resourceType === "planets") {
    oReq.open("GET", "https://swapi.co/api/planets/" + resourceId + "/");
  }
  oReq.send();
}
