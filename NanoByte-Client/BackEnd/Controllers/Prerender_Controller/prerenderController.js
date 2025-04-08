const fs = require("fs");
const path = require("path");
const PrerenderPage = require("../../Models/PrerenderPageModels");

const PRERENDER_DIR = path.join(
  __dirname,
  "../../../FrontEnd/prerender"
);

const template = ({ title, description, image, url, redirect }) => `<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${image}" />
  <meta http-equiv="refresh" content="0;url=${redirect}" />
</head>
<body></body>
</html>`;

const generateSingleFile = (page) => {
  const filePath = path.join(PRERENDER_DIR, `${page.pageName}.html`);
  const html = template({
    title: page.title,
    description: page.description,
    image: page.image,
    url: page.url,
    redirect: `/${page.pageName}`,
  });
  fs.writeFileSync(filePath, html, "utf8");
};

exports.generatePrerenderFiles = async (req, res) => {
  try {
    const force = req.query.force === "true"; // ?force=true لتوليد الكل
    const pages = await PrerenderPage.find({ isHidden: false });

    if (!fs.existsSync(PRERENDER_DIR)) {
      fs.mkdirSync(PRERENDER_DIR, { recursive: true });
    }

    let generatedCount = 0;

    for (const page of pages) {
      const filePath = path.join(PRERENDER_DIR, `${page.pageName}.html`);

      const shouldGenerate = force || !fs.existsSync(filePath);

      if (shouldGenerate) {
        generateSingleFile(page);
        generatedCount++;
      }
    }

    res.status(200).json({ message: "تم توليد الملفات بنجاح.", count: generatedCount });
  } catch (error) {
    console.error("Prerender error:", error);
    res.status(500).json({ message: "فشل في توليد الملفات.", error: error.message });
  }
};

exports.getAllPages = async (req, res) => {
  try {
    const pages = await PrerenderPage.find();
    res.status(200).json(pages);
  } catch (err) {
    res.status(500).json({ message: "فشل في جلب الصفحات.", error: err.message });
  }
};

exports.createPage = async (req, res) => {
  try {
    const newPage = await PrerenderPage.create(req.body);
    generateSingleFile(newPage);
    res.status(201).json(newPage);
  } catch (err) {
    res.status(400).json({ message: "فشل في إنشاء الصفحة.", error: err.message });
  }
};

exports.updatePage = async (req, res) => {
  try {
    const updated = await PrerenderPage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "الصفحة غير موجودة." });

    generateSingleFile(updated);

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: "فشل في تعديل الصفحة.", error: err.message });
  }
};

exports.deletePage = async (req, res) => {
  try {
    const deleted = await PrerenderPage.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "الصفحة غير موجودة." });

    const filePath = path.join(PRERENDER_DIR, `${deleted.pageName}.html`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.status(200).json({ message: "تم حذف الصفحة والملف." });
  } catch (err) {
    res.status(400).json({ message: "فشل في حذف الصفحة.", error: err.message });
  }
};