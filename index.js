"use strict";

// put your own value below!
const apiKey = "iUrIz5bXaBmdQ4idmvYx0rqNAFsQepCIJnhKHPPj";
const searchURL = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

function displayResults(responseJson) {
  console.log(responseJson);
  $("#results-list").empty();
  for (let i = 0; i < responseJson.data.length; i++) {
    $("#results-list").append(
      `<li><h3>${responseJson.data[i].fullName}</h3><br>
      <h4>${responseJson.data[i].states}</h4>
      <p>${responseJson.data[i].description}</p><br>
      <a href="${responseJson.data[i].url}">Click Here to Visit Website</p>
      </li>`
    );
  }
  //display the results section
  $("#results").removeClass("hidden");
}

function getNationalParks(query, limit = 10) {
  const params = {
    api_key: apiKey,
    q: query,
    limit
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const searchTerm = $("#js-search-term").val();
    const limit = $("#js-max-results").val();
    getNationalParks(searchTerm, limit);
  });
}

$(watchForm);
