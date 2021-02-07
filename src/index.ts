import axios from 'axios';
import express, { json, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import instance from './api/instance';
import imageToBase64 from 'image-to-base64';
import cors from 'cors';

const app = express();

app.use(json());

//app.use(express.static(__dirname)); // Current directory is root
app.use(cors());
app.use(express.static('public'));

function getStringWithDay() {
  var d = new Date();
  var weekday = new Array(7);
  weekday[0] = 'domingo';
  weekday[1] = 'segunda&feira';
  weekday[2] = 'terça&feira';
  weekday[3] = 'quarta&feira';
  weekday[4] = 'quinta&feira';
  weekday[5] = 'sexta&feira';
  weekday[6] = 'sábado';

  return `bom%20dia%20${weekday[d.getDay()]}`;
}

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createFile = async (url: string, fileName: string): Promise<any> => {
  try {
    return axios({
      method: 'get',
      url,
      responseType: 'stream',
    }).then(async function (response) {
      return response.data.pipe(fs.createWriteStream(`./public/${fileName}`));
    });
  } catch (error) {
    throw new Error(error);
  }
};

app.get('/', async (request: Request, response: Response) => {
  const url = await axios
    .get(
      `https://www.googleapis.com/customsearch/v1?q=${getStringWithDay()}&key=AIzaSyAwp7YnEblRiUP0gzRasVU7fD_PHZQ_A0c&cx=5d3148e9b4ad36fa6&start=${getRandomIntInclusive(
        1,
        3
      )}`
    )
    .then(response => {
      console.log(
        response.data.items[getRandomIntInclusive(1, 10)].pagemap.cse_image[0]
          .src
      );
      return response.data.items[getRandomIntInclusive(1, 10)].pagemap
        .cse_image[0].src;
    });

  let returnedB64 = await imageToBase64(url)
  const imageBase64 = `data:image/png;base64,${returnedB64}`;
   return response.json({
     urlPath: imageBase64,
   });
});

app.listen(process.env.PORT || 8000, () => {
  console.log('running');
});
