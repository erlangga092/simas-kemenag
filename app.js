const axios = require("axios").default;
const cheerio = require("cheerio");
const fs = require("fs");
const Excel = require("exceljs");

const url = "https://simas.kemenag.go.id/profil/masjid";

const eksekusiExcel = async (data, prev, action, init, num) => {
  const workBook = new Excel.Workbook();

  if (action === "update") {
    await workBook.xlsx.readFile(`${prev}.xlsx`);
  }

  const sheetNames = [
    "ACEH",
    "SUMATERA UTARA",
    "SUMATERA BARAT",
    "RIAU",
    "JAMBI",
    "SUMATERA SELATAN",
    "BENGKULU",
    "LAMPUNG",
    "KEP. BANGKA BELITUNG",
    "KEPULAUAN RIAU",
    "DKI JAKARTA",
    "BANTEN",
    "JAWA BARAT",
    "JAWA TENGAH",
    "D.I YOGYAKARTA",
    "JAWA TIMUR",
    "BALI",
    "NUSA TENGGARA BARAT",
    "NUSA TENGGARA TIMUR",
    "KALIMANTAN BARAT",
    "KALIMANTAN TENGAH",
    "KALIMANTAN SELATAN",
    "KALIMANTAN TIMUR",
    "SULAWESI UTARA",
    "SULAWESI TENGAH",
    "SULAWESI SELATAN",
    "SULAWESI TENGGARA",
    "GORONTALO",
    "SULAWESI BARAT",
    "MALUKU",
    "MALUKU UTARA",
    "PAPUA",
    "PAPUA BARAT",
    "KALIMANTAN UTARA",
  ];

  const addRowExcel = (item) => {
    return {
      name: item.name,
      id: item.id,
      address: item.address,
      phone: item.phone,
      email: item.email,
      web: item.web,
      provinsi: item.provinsi,
    };
  };

  let workSheet = null;
  sheetNames.forEach((sheetName) => {
    if (action === "create") {
      workSheet = workBook.addWorksheet(sheetName);
    } else if (action === "update") {
      workSheet = workBook.getWorksheet(sheetName);
    }

    workSheet.state = "visible";

    workSheet.columns = [
      { header: "name", key: "name" },
      { header: "id", key: "id" },
      { header: "address", key: "address" },
      { header: "phone", key: "phone" },
      { header: "email", key: "email" },
      { header: "web", key: "web" },
      { header: "provinsi", key: "provinsi" },
    ];
  });

  const workSheetAceh = workBook.getWorksheet("ACEH");
  const workSheetSumut = workBook.getWorksheet("SUMATERA UTARA");
  const workSheetSumbar = workBook.getWorksheet("SUMATERA BARAT");
  const workSheetRiau = workBook.getWorksheet("RIAU");
  const workSheetJambi = workBook.getWorksheet("JAMBI");
  const workSheetSumsel = workBook.getWorksheet("SUMATERA SELATAN");
  const workSheetBengkulu = workBook.getWorksheet("BENGKULU");
  const workSheetLampung = workBook.getWorksheet("LAMPUNG");
  const workSheetBangka = workBook.getWorksheet("KEP. BANGKA BELITUNG");
  const workSheetKepRiau = workBook.getWorksheet("KEPULAUAN RIAU");
  const workSheetJakarta = workBook.getWorksheet("DKI JAKARTA");
  const workSheetBanten = workBook.getWorksheet("BANTEN");
  const workSheetJabar = workBook.getWorksheet("JAWA BARAT");
  const workSheetJateng = workBook.getWorksheet("JAWA TENGAH");
  const workSheetJogja = workBook.getWorksheet("D.I YOGYAKARTA");
  const workSheetJatim = workBook.getWorksheet("JAWA TIMUR");
  const workSheetBali = workBook.getWorksheet("BALI");
  const workSheetNTB = workBook.getWorksheet("NUSA TENGGARA BARAT");
  const workSheetNTT = workBook.getWorksheet("NUSA TENGGARA TIMUR");
  const workSheetKalbar = workBook.getWorksheet("KALIMANTAN BARAT");
  const workSheetKalteng = workBook.getWorksheet("KALIMANTAN TENGAH");
  const workSheetKalsel = workBook.getWorksheet("KALIMANTAN SELATAN");
  const workSheetKaltim = workBook.getWorksheet("KALIMANTAN TIMUR");
  const workSheetSulut = workBook.getWorksheet("SULAWESI UTARA");
  const workSheetSulteng = workBook.getWorksheet("SULAWESI TENGAH");
  const workSheetSulsel = workBook.getWorksheet("SULAWESI SELATAN");
  const workSheetSultenggara = workBook.getWorksheet("SULAWESI TENGGARA");
  const workSheetGorontalo = workBook.getWorksheet("GORONTALO");
  const workSheetSulbar = workBook.getWorksheet("SULAWESI BARAT");
  const workSheetMaluku = workBook.getWorksheet("MALUKU");
  const workSheetMalukuUtara = workBook.getWorksheet("MALUKU UTARA");
  const workSheetPapua = workBook.getWorksheet("PAPUA");
  const workSheetPapuaBarat = workBook.getWorksheet("PAPUA BARAT");
  const workSheetKalut = workBook.getWorksheet("KALIMANTAN UTARA");

  data.forEach((item) => {
    switch (item.provinsi) {
      case "ACEH":
        workSheetAceh.addRow(addRowExcel(item));
        break;
      case "SUMATERA UTARA":
        workSheetSumut.addRow(addRowExcel(item));
        break;
      case "SUMATERA BARAT":
        workSheetSumbar.addRow(addRowExcel(item));
        break;
      case "RIAU":
        workSheetRiau.addRow(addRowExcel(item));
        break;
      case "JAMBI":
        workSheetJambi.addRow(addRowExcel(item));
        break;
      case "SUMATERA SELATAN":
        workSheetSumsel.addRow(addRowExcel(item));
        break;
      case "BENGKULU":
        workSheetBengkulu.addRow(addRowExcel(item));
        break;
      case "LAMPUNG":
        workSheetLampung.addRow(addRowExcel(item));
        break;
      case "KEP. BANGKA BELITUNG":
        workSheetBangka.addRow(addRowExcel(item));
        break;
      case "KEPULAUAN RIAU":
        workSheetKepRiau.addRow(addRowExcel(item));
        break;
      case "DKI JAKARTA":
        workSheetJakarta.addRow(addRowExcel(item));
        break;
      case "BANTEN":
        workSheetBanten.addRow(addRowExcel(item));
        break;
      case "JAWA BARAT":
        workSheetJabar.addRow(addRowExcel(item));
        break;
      case "JAWA TENGAH":
        workSheetJateng.addRow(addRowExcel(item));
        break;
      case "D.I YOGYAKARTA":
        workSheetJogja.addRow(addRowExcel(item));
        break;
      case "JAWA TIMUR":
        workSheetJatim.addRow(addRowExcel(item));
        break;
      case "BALI":
        workSheetBali.addRow(addRowExcel(item));
        break;
      case "NUSA TENGGARA BARAT":
        workSheetNTB.addRow(addRowExcel(item));
        break;
      case "NUSA TENGGARA TIMUR":
        workSheetNTT.addRow(addRowExcel(item));
        break;
      case "KALIMANTAN BARAT":
        workSheetKalbar.addRow(addRowExcel(item));
        break;
      case "KALIMANTAN TENGAH":
        workSheetKalteng.addRow(addRowExcel(item));
        break;
      case "KALIMANTAN SELATAN":
        workSheetKalsel.addRow(addRowExcel(item));
        break;
      case "KALIMANTAN TIMUR":
        workSheetKaltim.addRow(addRowExcel(item));
        break;
      case "SULAWESI UTARA":
        workSheetSulut.addRow(addRowExcel(item));
        break;
      case "SULAWESI TENGAH":
        workSheetSulteng.addRow(addRowExcel(item));
        break;
      case "SULAWESI SELATAN":
        workSheetSulsel.addRow(addRowExcel(item));
        break;
      case "SULAWESI TENGGARA":
        workSheetSultenggara.addRow(addRowExcel(item));
        break;
      case "GORONTALO":
        workSheetGorontalo.addRow(addRowExcel(item));
        break;
      case "SULAWESI BARAT":
        workSheetSulbar.addRow(addRowExcel(item));
        break;
      case "MALUKU":
        workSheetMaluku.addRow(addRowExcel(item));
        break;
      case "MALUKU UTARA":
        workSheetMalukuUtara.addRow(addRowExcel(item));
        break;
      case "PAPUA":
        workSheetPapua.addRow(addRowExcel(item));
        break;
      case "PAPUA BARAT":
        workSheetPapuaBarat.addRow(addRowExcel(item));
        break;
      case "KALIMANTAN UTARA":
        workSheetKalut.addRow(addRowExcel(item));
        break;
      default:
        return null;
    }
  });

  let next = parseInt(prev.split("-")[1]) + 1;
  await workBook.xlsx.writeFile(`masjid-${next}.xlsx`);

  console.log(`File created masjid-${next}.xlsx from ${init} - ${num}`);
};

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

const olahDataPromise = (
  data = [],
  prev = "masjid-prev",
  action = "create",
  init,
  num
) => {
  let arrMasjid = [];

  if (Array.isArray(data) && data.length) {
    data.forEach((item, i) => {
      if (
        (item[3] !== "-" && item[3] !== "--" && item[3] !== "0") ||
        item[4] !== "-"
      ) {
        arrMasjid[i] = {
          name: `Masjid ${item[0]}`,
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

  eksekusiExcel(masjidFix, prev, action, init, num);
};

const eksekusiPromise = async (init, num, prev, action) => {
  console.log(`${init} - ${num}`);
  let listPromise = [];

  for (let i = init; i <= num; i++) {
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

  olahDataPromise(resultValue, prev, action, init, num);
};

eksekusiPromise(125_001, 126_000, "masjid-5", "update");
