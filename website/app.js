/* Global Variables */
const apiKey = "cdee76943066d53839424f2365c08769";
const api_point = "https://api.openweathermap.org/data/2.5/weather?zip=";
//{zip code},{country code}&appid={API key}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate =
  parseInt(d.getMonth()) + 1 + "." + d.getDate() + "." + d.getFullYear();

document
  .getElementById("generate")
  .addEventListener("click", addInfoAndReturnIt);

function addInfoAndReturnIt() {
  const newZipCode = document.getElementById("zip").value;
  const feelingsOfWeather = document.getElementById("feelings").value;
  getInfo("/getWeather").then(async function () {
    const dataFromPost = await postWeatherFeelings("/addFeelings", {
      feelings: feelingsOfWeather,
    });
    updateUI(api_point + newZipCode + ",us&appid=" + apiKey, dataFromPost);
  });
}

const getInfo = async (url) => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    /* console.log(data); */
    return data;
  } catch (error) {
    console.log("error" + error);
  }
};

const postWeatherFeelings = async (url = "", data = {}) => {
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

const updateUI = async (url = "", data) => {
  const request = await fetch(url);
  try {
    // Transform into JSON
    const allData = await request.json();
    document.getElementById("date").innerHTML = newDate;
    document.getElementById("temp").innerHTML =
      (allData.main.temp - 273.15).toFixed(2) + "&deg; C";
    document.getElementById("content").innerHTML = data.feelings;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
