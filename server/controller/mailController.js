const nodemailer = require("nodemailer");
const Email = require("../models/Email");

exports.email_post = async (req, res) => {
    console.log(req.body.from);
  try {
    // Create a transporter with SMTP options
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "mithunm.20cse@kongu.edu",
        pass: "Mithun123!!",
      },
    });
    // Create an email object with user input
    const email = new Email({
      fname:req.body.fname,
      lname:req.body.lname,
      from: req.body.from,
      to: "mithunm.20cse@kongu.edu",
      phone: req.body.phone,
      text: req.body.text,
    });

    // Send the email using nodemailer
    const info = await transporter.sendMail({
      from: req.body.from,
      to: "mithunm.20cse@kongu.edu",
      phone: req.body.phone,
      text: req.body.text,
      html:`<h5> Email :</h5><p>${req.body.from}</p> <br><h5> Phone Number:</h5> <p>${req.body.phone} </p> <br><h5> Name :</h5> <p> ${req.body.fname} </p> <br> <h4> Message : </h4> <br> <p> ${req.body.text} </p> `
    });

    // Save the email object to MongoDB
    await email.save();

    // Send a response to the client
    console.log("Email sent successfully");
    res.json({ message: "Email sent successfully", info });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.email_get = async (req, res) => {
    console.log("Get")
  try {
    const emails = await Email.find({});
    res.json(emails);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
exports.email_delete = async (req, res) => {
  try {
    const deletedEmail = await Email.findByIdAndDelete(req.params.id);
    if (!deletedEmail) {
      return res.status(404).json({ message: "Email not found" });
    }
    res.json({ message: "Email deleted successfully", email: deletedEmail });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};