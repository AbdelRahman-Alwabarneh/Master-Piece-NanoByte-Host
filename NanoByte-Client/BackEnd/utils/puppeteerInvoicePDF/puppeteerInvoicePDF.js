const puppeteer = require("puppeteer");
const jwt = require('jsonwebtoken');

const generateInvoicePDF = async ({orderNumber,userid  }) => {
    if (!userid) throw new Error("❌ User ID is missing");

      token = jwt.sign(
        { userId: userid }, 
        process.env.JWT_SECRET_KEY, 
        { expiresIn: "10s" } 
      );
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  const url = `${process.env.FRONT_END_LINK}/PrintInvoice/${orderNumber}?token=${token}`;
  await page.goto(url, { waitUntil: "domcontentloaded" });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  await page.emulateMediaType("screen");

  const pdfBuffer = await page.pdf({
    width: "794px", 
    height: `1125px`, 
    printBackground: true,
  });

  await browser.close();
  return pdfBuffer;
};

module.exports = generateInvoicePDF;
