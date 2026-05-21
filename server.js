const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const multer = require("multer");

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

/* =========================
   MULTER
========================= */

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage
});

/* =========================
   NODEMAILER
========================= */

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {

    user: "safartechlab@gmail.com",

    pass: "jkev zspi pgwh ycqj"

  }

});

/* =========================
   CONTACT FORM
========================= */

app.post("/send-email", async (req, res) => {

  try {

    const {
      full_name,
      phone,
      email,
      project_name,
      deadline,
      description
    } = req.body;

    const mailOptions = {

      from: email,

      to: "safartechlab@gmail.com",

      subject: "New Project Submission",

      html: `

        <h2>New Project Submission</h2>

        <p><strong>Full Name:</strong> ${full_name}</p>

        <p><strong>Phone:</strong> ${phone}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Project Name:</strong> ${project_name}</p>

        <p><strong>Deadline:</strong> ${deadline}</p>

        <p><strong>Description:</strong></p>

        <p>${description}</p>

      `

    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({

      success: true,

      message: "Message Sent Successfully"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Failed To Send Email"

    });

  }

});

/* =========================
   JOB APPLICATION FORM
========================= */

app.post("/apply-job", upload.single("resume"), async (req, res) => {

  try {

    const {
      fullName,
      email,
      phone,
      position,
      coverMessage
    } = req.body;

    const mailOptions = {

      from: email,

      to: "safartechlab@gmail.com",

      subject: `Job Application - ${position}`,

      html: `

        <h2>New Job Application</h2>

        <p><strong>Full Name:</strong> ${fullName}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Phone:</strong> ${phone}</p>

        <p><strong>Position:</strong> ${position}</p>

        <p><strong>Cover Message:</strong></p>

        <p>${coverMessage}</p>

      `,

      attachments: [

        {

          filename: req.file.originalname,

          content: req.file.buffer

        }

      ]

    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({

      success: true,

      message: "Application Submitted Successfully"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Failed To Submit Application"

    });

  }

});


/* =========================
   CONTACT MESSAGE FORM
========================= */

app.post("/contact-message", async (req, res) => {
  try {
    const { full_name, email, subject, message } = req.body;

    if (!full_name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const mailOptions = {
      from: email, // ✅ FIXED
      to: "safartechlab@gmail.com",
      subject: `Contact Form - ${subject || "No Subject"}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Full Name:</strong> ${full_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Message Sent Successfully"
    });

  } catch (error) {
    console.error("Email Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed To Send Message"
    });
  }
});


/* =========================
   SERVER
========================= */

const PORT = 3000;

app.listen(PORT, () => {

  console.log(`Server Running On Port ${PORT}`);

});