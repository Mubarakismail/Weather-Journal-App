/* Global Variables */
const apiKey = "cdee76943066d53839424f2365c08769";
const api_point = "https://api.openweathermap.org/data/2.5/weather?zip=";
//{zip code},{country code}&appid={API key}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("generate").addEventListener("click", postGet);

// Async POST
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// Async GET
const retrieveData = async (url = "") => {
  const request = await fetch(url);
  try {
    // Transform into JSON
    const allData = await request.json();
    document.getElementById("date").innerHTML = newDate;
    document.getElementById("temp").innerHTML =
      (allData.main.temp - 273.15).toFixed(2) + "&deg; C";
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

// TODO-Chain your async functions to post an animal then GET the resulting data

// TODO-Call the chained function
function postGet(e) {
  const newZipCode = document.getElementById("zip").value;
  const newFeelings = document.getElementById("feelings").value;
  if (newZipCode) retrieveData(api_point + newZipCode + ",us&appid=" + apiKey);
}

postGet();
