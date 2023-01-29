const express = require('express')
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
var port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('index', {msg:''});
});
app.post('/send', (req, res) => {
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Company: ${req.body.company}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;
  
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        use_authentication: true, 
        auth: {
          user: "hajsmtp@gmail.com",
          pass: "*****"
        }
      });
    const mailOptions = {
        from: 'hajsmtp@gmail.com',
        to: 'haj8110@gmail.com',
        subject: 'How To Send Email With Attachment Using Node.js',
        html: output // html body
        
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
        res.render('index', {msg:'Email has been sent'});
    });
  
    });




app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`)
})