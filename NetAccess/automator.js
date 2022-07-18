const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();
require("chromedriver");
const swd = require("selenium-webdriver");

const tab = new swd.Builder().forBrowser("chrome").build();
const openTab = tab.get("https://netaccess.iitm.ac.in/account/login");

openTab
  .then(() => tab.manage().setTimeouts({ implicit: 10000 }))
  .then(() =>
    tab.findElement(swd.By.xpath("/html/body/div[2]/div/form/div[1]/input"))
  )
  .then((username) => username.sendKeys(process.env.ROLLNO))
  .then(() =>
    tab.findElement(swd.By.xpath("/html/body/div[2]/div/form/div[2]/input"))
  )
  .then((password) => password.sendKeys(process.env.PASSWORD))
  .then(() =>
    tab.findElement(swd.By.xpath("/html/body/div[2]/div/form/div[3]/button"))
  )
  .then((login) => login.click())
  .then(() =>
    tab.findElement(swd.By.xpath("/html/body/div[2]/div/div[1]/div[2]/a"))
  )
  .then((approve) => approve.click())
  .then(() =>
    tab.findElement(
      swd.By.xpath("/html/body/div[2]/div/div[1]/form/div[2]/label")
    )
  )
  .then((oneDay) => oneDay.click())
  .then(() =>
    tab.findElement(
      swd.By.xpath("/html/body/div[2]/div/div[1]/form/div[4]/button")
    )
  )
  .then((authorize) => authorize.click())
  .then(() => tab.close())
  .then(() => {
    console.log(" then automation is successful !");
    setTimeout(() => process.exit(0), 2000);
  })
  .then((err) => {
    tab.close();
    console.log(err);
    console.log("The automation was Unsuccessful !");
    setTimeout(() => process.exit(1), 2000);
  });

app.listen(8000, () => {
  console.log("Server is running Successfully");
});
