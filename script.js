const dataByName = "https://restcountries.eu/rest/v2/name/";
const dataByCode = "https://restcountries.eu/rest/v2/alpha/";
const submitButton = document.getElementById("submit");
const inputCountry = document.getElementById("country");
const resultsContainer = document.getElementById("results");

function getDataInfo(apiType, inputData) {
  return fetch(`${apiType}${inputData}`)
    .then((response) => response.json())
    .then((data) => data);
}

async function generateCapital(inputData) {
  const list = await getDataInfo(dataByName, inputData);
  if (list.status === 404) {
    window.alert("Country is not found");
    return;
  }
  let capital = list[0].capital;
  let borders = list[0].borders;
  //   console.log(capital);
  //   console.log(borders);
  let node = document.createElement("P");
  let textnode = document.createTextNode(capital);
  node.appendChild(textnode);
  document.getElementById("results").appendChild(node);
  borders.forEach(async (element) => {
    const borderInfo = await getDataInfo(dataByCode, element);
    borderCapital = borderInfo.capital;
    let node = document.createElement("P");
    let textnode = document.createTextNode(borderCapital);
    node.appendChild(textnode);
    resultsContainer.appendChild(node);
  });
}

submitButton.addEventListener("click", () => {
  let data = inputCountry.value;
  if (data === "") window.alert("Enter Country");
  resultsContainer.innerHTML = "";
  generateCapital(data);
});
