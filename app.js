const axios = require("axios").default;
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://simas.kemenag.go.id/profil/masjid";

const scrapeData = async (arg = 0) => {
  try {
    console.log("Request data");
    const { data } = await axios.get(`${url}/${arg}`);
    const $ = cheerio.load(data);

    let fullText = [];
    const mosqueName = $(".masjid-title").text();
    fullText.push(mosqueName);

    const idMosque = $(".masjid-card").children("a").text();
    fullText.push(idMosque);

    let addressMosque = $(".masjid-alamat-location")
      .children("p")
      .first()
      .text();

    fullText.push(addressMosque);

    const list = $(".masjid-alamat-phone");
    let arrText = [];
    list.each((_i, item) => {
      let listText = $(item).children("p").text();
      arrText.push(listText);
    });

    const fullDataScrap = fullText.concat(arrText);
    return fullDataScrap;
  } catch (error) {
    console.log(error);
  }
};

const olahDataPromise = (data = []) => {
  let arrMasjid = [];

  if (Array.isArray(data) && data.length) {
    data.forEach((item, i) => {
      if (
        (item[3] !== "-" && item[3] !== "--" && item[3] !== "0") ||
        item[4] !== "-"
      ) {
        arrMasjid[i] = {
          name: item[0],
          id: item[1],
          address: item[2].toString().replace(/\t/g, "").split("\r\n"),
          phone: item[3],
          email: item[4],
          web: item[5],
        };
      }
    });
  }

  let masjid = arrMasjid.filter((item) => item !== null);

  fs.writeFile("masjid.json", JSON.stringify(masjid, null, 2), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Successfully written data to file");
  });
};

const eksekusiPromise = async (num) => {
  let listPromise = [];

  for (let i = 0; i < num; i++) {
    let scrapeId = scrapeData(i);
    listPromise.push(scrapeId);
  }

  let listResult = [];
  try {
    listResult = await Promise.allSettled(listPromise);
  } catch (error) {
    console.log(error);
  }

  let resultValue = [];
  listResult.forEach((result) => {
    if (result.status === "fulfilled") {
      resultValue.push(result.value);
    } else {
      resultValue.push({});
    }
  });

  olahDataPromise(resultValue);
};

eksekusiPromise(200);
