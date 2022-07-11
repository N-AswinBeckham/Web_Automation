const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();
require("chromedriver");
const swd = require("selenium-webdriver");

const tab = new swd.Builder().forBrowser("chrome").build();
const openTab = tab.get("https://internship.iitm.ac.in/students/login.php");

openTab
  .then(() => tab.manage().setTimeouts({ implicit: 10000 }))
  .then(() => tab.findElement(swd.By.id("rollno")))
  .then((rollno) => rollno.sendKeys(process.env.ROLLNO))
  .then(() => tab.findElement(swd.By.id("pass")))
  .then((pass) => pass.sendKeys(process.env.PASS))
  .then(() => tab.findElement(swd.By.name("submit")))
  .then((submit) => submit.click())
  .then(() =>
    setTimeout(() => {
      tab
        .switchTo()
        .alert()
        .accept();
    }, 1000)
  )
  .then(() => {
    console.log(" then automation is successful !");
    setTimeout(() => process.exit(0), 2000);
  })
  // .then((err) => {
  //   tab.close();
  //   console.log(err);
  //   console.log("The automation was Unsuccessful !");
  //   setTimeout(() => process.exit(1), 2000);
  // });

app.listen(8000, () => {
  console.log("Server is running Successfully");
});
