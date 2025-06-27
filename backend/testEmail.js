require('dotenv').config();
const sendEmail = require('./utils/sendEmail');

sendEmail('ankush@kgpian.iitkgp.ac.in', 'Test Email', 'Hello from IITKGP Social Media!');
