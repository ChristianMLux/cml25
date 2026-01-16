/* eslint-disable @typescript-eslint/no-require-imports */
const functions = require('firebase-functions/v2');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const GMAIL_EMAIL = process.env.GMAIL_EMAIL;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;

exports.sendContactNotification = functions.firestore.onDocumentCreated(
  'contacts/{contactId}',
  async (event) => {
    try {
      const contactData = event.data.data();

      const date = contactData.createdAt
        ? new Date(contactData.createdAt.toDate())
        : new Date();

      const formattedDate = new Intl.DateTimeFormat('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);

      const mailTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: GMAIL_EMAIL,
          pass: GMAIL_PASSWORD,
        },
      });

      const subject = `Neue Kontaktanfrage: ${contactData.subject}`;

      const mailOptions = {
        from: `"Portfolio Kontaktformular" <${GMAIL_EMAIL}>`,
        to: GMAIL_EMAIL,
        subject: subject,
        html: `
          <h1>Neue Kontaktanfrage über dein Portfolio</h1>
          <p><strong>Zeit:</strong> ${formattedDate}</p>
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>E-Mail:</strong> ${contactData.email}</p>
          <p><strong>Betreff:</strong> ${contactData.subject}</p>
          <p><strong>Sprache:</strong> ${contactData.locale || 'Nicht angegeben'}</p>
          <h2>Nachricht:</h2>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
            <p>${contactData.message.replace(/\n/g, '<br>')}</p>
          </div>
          <hr>
          <p style="font-size: 0.8em; color: #666;">
            Diese E-Mail wurde automatisch vom Kontaktformular deines Portfolios gesendet.
          </p>
        `,
      };

      await mailTransport.sendMail(mailOptions);
      return null;
    } catch (error) {
      console.error('Fehler beim Senden der E-Mail:', error);
      return null;
    }
  }
);
