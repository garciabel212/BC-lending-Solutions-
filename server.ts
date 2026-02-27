import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { fullName, email, phone, zip, loanType, loanAmount, downPayment, creditScore, message } = req.body;

    console.log("Received application request:", req.body);

    // Configure Nodemailer
    // Note: In a real production environment, you would use environment variables for these credentials.
    // For now, we'll set up the structure. If SMTP_USER and SMTP_PASS are not provided, it will log to console.
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"BC Prime Website" <${process.env.SMTP_USER || 'noreply@bcprime.com'}>`,
      to: "raudel.bonne@bcprimelendingsolutions.com",
      subject: `Strategic Financing Inquiry: ${fullName}`,
      text: `
        New Strategic Financing Inquiry Received:
        
        ENTITY / IDENTITY:
        - Full Name: ${fullName}
        - Email: ${email}
        - Phone: ${phone}
        - Zip Code: ${zip}
        
        ASSET REQUIREMENTS:
        - Asset Category: ${loanType}
        - Estimated Asset Value: $${loanAmount}
        - Target Loan Amount: $${downPayment}
        - Credit / Liquid Assets: ${creditScore}
        
        PROJECT OVERVIEW:
        - Message: ${message}
      `,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background: linear-gradient(135deg, #D8B66A 0%, #B8954A 100%); padding: 32px; text-align: center;">
            <h1 style="color: #070A12; margin: 0; font-size: 26px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px;">New Financing Inquiry</h1>
            <p style="color: #070A12; margin: 8px 0 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; opacity: 0.8;">BC Prime Lending Solutions</p>
          </div>
          <div style="padding: 40px; background-color: #ffffff; color: #1a202c;">
            <div style="margin-bottom: 32px;">
              <h2 style="border-bottom: 1px solid #D8B66A; padding-bottom: 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; color: #B8954A; margin-bottom: 20px;">Entity / Identity</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-size: 14px; color: #718096; width: 40%;">Full Name</td><td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #1a202c;">${fullName}</td></tr>
                <tr><td style="padding: 8px 0; font-size: 14px; color: #718096;">Email Address</td><td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #1a202c;">${email}</td></tr>
                <tr><td style="padding: 8px 0; font-size: 14px; color: #718096;">Phone Number</td><td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #1a202c;">${phone}</td></tr>
                <tr><td style="padding: 8px 0; font-size: 14px; color: #718096;">Zip Code</td><td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #1a202c;">${zip}</td></tr>
              </table>
            </div>
            
            <div style="margin-bottom: 32px;">
              <h2 style="border-bottom: 1px solid #D8B66A; padding-bottom: 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; color: #B8954A; margin-bottom: 20px;">Asset Requirements</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-size: 14px; color: #718096; width: 40%;">Asset Category</td><td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #1a202c;">${loanType}</td></tr>
                <tr><td style="padding: 8px 0; font-size: 14px; color: #718096;">Market Value</td><td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #1a202c;">$${loanAmount}</td></tr>
                <tr><td style="padding: 8px 0; font-size: 14px; color: #718096;">Target Loan</td><td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #1a202c;">$${downPayment}</td></tr>
                <tr><td style="padding: 8px 0; font-size: 14px; color: #718096;">Credit Profile</td><td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #1a202c;">${creditScore}</td></tr>
              </table>
            </div>
            
            <div>
              <h2 style="border-bottom: 1px solid #D8B66A; padding-bottom: 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; color: #B8954A; margin-bottom: 20px;">Project Overview</h2>
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; font-size: 14px; line-height: 1.6; color: #4a5568; white-space: pre-wrap;">${message}</div>
            </div>
          </div>
          <div style="background-color: #070A12; padding: 24px; text-align: center; font-size: 11px; color: #718096; text-transform: uppercase; letter-spacing: 1px;">
            Confidential Inquiry • BC Prime Lending Solutions • Miami, FL
          </div>
        </div>
      `,
    };

    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to raudel.bonne@bcprimelendingsolutions.com");
        res.status(200).json({ message: "Application sent successfully" });
      } else {
        console.warn("SMTP credentials missing. Email content logged above.");
        res.status(200).json({ 
          message: "Application received (Simulated)", 
          warning: "SMTP credentials not configured. Email was logged to server console." 
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send application" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
