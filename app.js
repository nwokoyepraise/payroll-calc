//import fs for file input reading
const fs = require("fs");

//IIFE to read input from file
(async () => {
  //read input file and call function to calc pay passing the data as arguement
  calcPay((await fs.readFileSync("sample.txt")).toString());
})();

//function to calculate output
function calcPay(data) {
  //initialize sum variable to zero
  let sum = 0;

  //split input read from file in other to separate name of worker and pay data
  let res1 = data.split("=");

  //split pay data to its individual unit
  let res2 = res1[1].split(",");

  let res3 = [];
  for (let i = 0; i < res2.length; i++) {
    //slice array and store data as json object using day abbreviation as key and and the hours worked as value
    res3.push({ [res2[i].slice(0, 2)]: res2[i].slice(2) });
  }

  for (let j = 0; j < res3.length; j++) {
    Object.entries(res3[j]).forEach((element) => {
      //split and store time components of hours worked
      let timeStart = element[1].split("-")[0];
      let timeEnd = element[1].split("-")[1];
      let hourStart = element[1].split("-")[0].slice(0, 2);
      let hourEnd = element[1].split("-")[1].slice(0, 2);
     
      //calculate num of hour worked while handling the edge case of using "00:00" as "24:00" hours in hourEnd
      let numHours = (hourEnd == "00") ? Math.abs(24 - hourStart) : Math.abs(hourEnd - hourStart);
    
      //check day data and assign amount by number of hours worked
      switch (element[0]) {
        case "MO":
        case "TU":
        case "WE":
        case "TH":
        case "FR":
          if (timeStart >= "00:01" && timeEnd == "00:00") {
            sum += 20 * numHours;
          }
          else if (timeStart >= "00:01" && timeEnd <= "09:00") {
            sum += 25 * numHours;
          } else if (timeStart >= "09:01" && timeEnd <= "18:00") {
            sum += 15 * numHours;
          } else if (timeStart >= "18:01" && timeEnd <= "00:00") {
            sum += 20 * numHours;
          }
          break;
        case "SA":
        case "SU":
          if (timeStart >= "00:01" && timeEnd == "00:00") {
            sum += 25 * numHours;
          }
          else if (timeStart >= "00:01" && timeEnd <= "09:00") {
            sum += 30 * numHours;
          } else if (timeStart >= "09:01" && timeEnd <= "18:00") {
            sum += 20 * numHours;
          } else if (timeStart >= "18:01" && timeEnd <= "24:00") {
            sum += 25 * numHours;
          }
          break;
      }
    });
  }
  //print final output to console using the specified template
  console.log(`The amount to pay ${res1[0]} is: ${sum} USD`);
  return `The amount to pay ${res1[0]} is: ${sum} USD`;
}

module.exports.calcPay = calcPay;
