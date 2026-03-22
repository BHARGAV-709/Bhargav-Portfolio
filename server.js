const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yourgmail@gmail.com",
        pass: "your_app_password"
      }
    });

    await transporter.sendMail({
      from: email,
      to: "yourgmail@gmail.com",
      subject: subject,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `
    });

    res.send("Message sent successfully!");
  } catch (error) {
    res.status(500).send("Error sending message");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));