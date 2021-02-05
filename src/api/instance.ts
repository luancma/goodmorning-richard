import axios from "axios";

function getStringWithDay() {
  var d = new Date();
  var weekday = new Array(7);
  weekday[0] = "domingo";
  weekday[1] = "segunda&feira";
  weekday[2] = "terça&feira";
  weekday[3] = "quarta&feira";
  weekday[4] = "quinta&feira";
  weekday[5] = "sexta&feira";
  weekday[6] = "sábado";

  return `bom%20dia%20${weekday[d.getDay()]}`;
}

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const instance = axios.create({
    baseURL: `https://www.googleapis.com/customsearch/v1?q=${getStringWithDay()}&key=AIzaSyDmsMFexOfkWb8ReBWbe6iT-z-gy3Q9XQ4&cx=5d3148e9b4ad36fa6&start=${getRandomIntInclusive(1, 3)}`,
});


export default instance;
