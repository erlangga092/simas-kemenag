const axios = require("axios").default;
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://simas.kemenag.go.id/profil/masjid";

const switchProvinsi = (strVal) => {
  switch (strVal) {
    case "01":
      return "ACEH";
    case "02":
      return "SUMATERA UTARA";
    case "03":
      return "SUMATERA BARAT";
    case "04":
      return "RIAU";
    case "05":
      return "JAMBI";
    case "06":
      return "SUMATERA SELATAN";
    case "07":
      return "BENGKULU";
    case "08":
      return "LAMPUNG";
    case "09":
      return "KEP. BANGKA BELITUNG";
    case "10":
      return "KEPULAUAN RIAU";
    case "11":
      return "DKI JAKARTA";
    case "12":
      return "BANTEN";
    case "13":
      return "JAWA BARAT";
    case "14":
      return "JAWA TENGAH";
    case "15":
      return "D.I YOGYAKARTA";
    case "16":
      return "JAWA TIMUR";
    case "17":
      return "BALI";
    case "18":
      return "NUSA TENGGARA BARAT";
    case "19":
      return "NUSA TENGGARA TIMUR";
    case "20":
      return "KALIMANTAN BARAT";
    case "21":
      return "KALIMANTAN TENGAH";
    case "22":
      return "KALIMANTAN SELATAN";
    case "23":
      return "KALIMANTAN TIMUR";
    case "24":
      return "SULAWESI UTARA";
    case "25":
      return "SULAWESI TENGAH";
    case "26":
      return "SULAWESI SELATAN";
    case "27":
      return "SULAWESI TENGGARA";
    case "28":
      return "GORONTALO";
    case "29":
      return "SULAWESI BARAT";
    case "30":
      return "MALUKU";
    case "31":
      return "MALUKU UTARA";
    case "32":
      return "PAPUA";
    case "33":
      return "PAPUA BARAT";
    case "34":
      return "KALIMANTAN UTARA";
    default:
      return "-";
  }
};

const switchNum = (num) => {
  if (num.indexOf("081") !== -1) {
    return true;
  } else if (num.indexOf("081") !== -1) {
    return true;
  } else if (num.indexOf("082") !== -1) {
    return true;
  } else if (num.indexOf("083") !== -1) {
    return true;
  } else if (num.indexOf("085") !== -1) {
    return true;
  } else if (num.indexOf("087") !== -1) {
    return true;
  } else if (num.indexOf("088") !== -1) {
    return true;
  } else if (num.indexOf("089") !== -1) {
    return true;
  } else if (num.indexOf("62") !== -1) {
    return true;
  } else if (num.indexOf("+62") !== -1) {
    return true;
  } else {
    return false;
  }
};

const eksekusiProvinsi = (item) => {
  if (item.length) {
    let provinsi = item[1].toString().split(".");
    let dataProv = switchProvinsi(provinsi[2]);
    return dataProv;
  }
};

const scrapeData = async (arg = 0) => {
  try {
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
          phone: item[3].toString().replace(/-/g, "").replace(" ", ""),
          email: item[4],
          web: item[5],
          provinsi: eksekusiProvinsi(item),
        };
      }
    });
  }

  let masjid = arrMasjid.filter((item) => item !== null);
  let masjidFix = masjid.filter((item) => switchNum(item.phone));

  fs.writeFile("masjid.json", JSON.stringify(masjidFix, null, 2), (err) => {
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

eksekusiPromise(400);
