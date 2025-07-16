
import express from 'express';
import path from 'path';
import puppeteer from 'puppeteer';
import ejs from 'ejs';
const router = express.Router();

router.post('/generate-pdf', async (req, res) => {
    try {
        const {
            testatorDetails,
            bankAccounts,
            beneficiaries,
            insurancePolicies,
            stocks,
            mutualFunds,
            jewellery,
            house,
            land,
            executors,
        } = req.body;

        const templatePath = path.join(__dirname, "willTemplate.ejs");

        const html = await ejs.renderFile(templatePath, {
            testator: testatorDetails,
            bankAccounts,
            beneficiaries,
            insurancePolicies,
            stocks,
            mutualFunds,
            jewellery,
            house,
            land,
            executors,
        });

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });
        const pdf = await page.pdf({ format: "A4" });

        await browser.close();

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=will.pdf",
        });

        res.send(pdf);
    } catch (err) {
        console.error("PDF generation error:", err);
        res.status(500).send("Failed to generate PDF");
    }
});

export default router;