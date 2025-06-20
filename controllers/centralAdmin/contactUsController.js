const centralContactUsSchema = require('../../models/centralAdmin/centralContactUsModel');

const nodemailer = require('nodemailer');

// ADD CONTACT QUERY
exports.addContactQuery = async (req, res) => {
  try {
    const ContactUs = req.db.model('ContactUs', centralContactUsSchema);
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ status: false, message: 'All fields are required' });
    }

    const newQuery = new ContactUs({ name, email, subject, message });
    await newQuery.save();

    // Setup transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kunalukirde03@gmail.com',         // College email
        pass: 'flto ctqg ijgy ukli'                       // College email password (⚠️ use env file in production)
      }
    });
    



    // Email to college (admin)
    const collegeMailOptions = {
      from: 'kunalukirde03@gmail.com',
      to: 'kunalukirde03@gmail.com',
      subject: `New Contact Query from ${name}`,
      text: `
You have received a new query:

Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}
      `
    };

    // Email to customer (user)
    const customerMailOptions = {
      from: 'kunalukirde03@gmail.com',
      to: email,
      subject: 'Thank you for contacting us!',
      text: `
Hello ${name},

We have received your message and will contact you soon.

Your message:
${message}

Thank you,
Brahma Valley University
      `
    };

    // Send both emails
    await transporter.sendMail(collegeMailOptions);
    await transporter.sendMail(customerMailOptions);

    res.status(201).json({
      status: true,
      message: 'Submitted successfully and emails sent',
      data: newQuery
    });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server error', error: error.message });
  }
};




















































// ADD CONTACT QUERY
// exports.addContactQuery = async (req, res) => {
//   try {
//     const ContactUs = req.db.model('ContactUs', centralContactUsSchema);
//     const { name, email, subject, message } = req.body;

//     if (!name || !email || !subject || !message) {
//       return res.status(400).json({ status: false, message: 'All fields are required' });
//     }

//     const newQuery = new ContactUs({ name, email, subject, message });
//     await newQuery.save();

//     res.status(201).json({ status: true, message: 'Submitted successfully', data: newQuery });
//   } catch (error) {
//     res.status(500).json({ status: false, message: 'Server error', error: error.message });
//   }
// };












// GET ALL QUERIES
exports.getContactQueries = async (req, res) => {
  try {
    const ContactUs = req.db.model('ContactUs', centralContactUsSchema);
    const queries = await ContactUs.find().sort({ createdAt: -1 });
    res.status(200).json({ status: true, message: 'Fetched successfully', data: queries });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server error', error: error.message });
  }
};

// DELETE QUERY
exports.deleteContactQuery = async (req, res) => {
  try {
    const ContactUs = req.db.model('ContactUs', centralContactUsSchema);
    const deleted = await ContactUs.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ status: false, message: 'Query not found' });
    }
    res.status(200).json({ status: true, message: 'Query deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server error', error: error.message });
  }
};
