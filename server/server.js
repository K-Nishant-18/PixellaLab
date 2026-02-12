const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

console.log('Environment variables check:');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');
console.log('EMAIL_TO:', process.env.EMAIL_TO ? 'Set' : 'Not set');

// Middleware
app.use(cors());
app.use(express.json());

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify transporter
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Email configuration error:', error);
    } else {
        console.log('✅ Email server is ready to send messages');
    }
});

// Email endpoint
app.post('/api/send-email', async (req, res) => {
    const { inquiryType, name, company, email, phone, projectType, budget, websiteUrl, details } = req.body;

    // Validation
    if (!name || !email || !details) {
        return res.status(400).json({
            success: false,
            message: 'Name, email, and details are required'
        });
    }

    // Subject & Title Logic
    const isAudit = inquiryType === 'audit';
    const emailSubject = isAudit
        ? `🚀 Free Website Audit Request from ${name}`
        : `✨ New Project Inquiry from ${name}`;
    const emailTitle = isAudit
        ? 'Website Audit Request'
        : 'New Project Inquiry';

    // Email content
    const mailOptions = {
        from: `"Pixella Labs Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        replyTo: email,
        subject: emailSubject,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${emailTitle}</title>
                <style>
                    /* Reset */
                    body, p, h1, h2, h3, h4, h5, h6 { margin: 0; padding: 0; }
                    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; background-color: #f4f4f0; color: #1a1a1a; -webkit-font-smoothing: antialiased; }
                    
                    /* Container */
                    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 1px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
                    
                    /* Header */
                    .header { background-color: #1a1a1a; padding: 40px; text-align: center; }
                    .logo-text { color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -1px; text-decoration: none; }
                    .accent { color: #2b45f5; }
                    .header-badge { display: inline-block; margin-top: 10px; padding: 4px 12px; background: rgba(255,255,255,0.1); color: #fff; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; border-radius: 100px; }
                    
                    /* Content */
                    .content { padding: 40px; }
                    .intro { font-size: 16px; color: #666666; margin-bottom: 30px; }
                    .grid { display: table; width: 100%; border-collapse: collapse; }
                    .row { display: table-row; }
                    .cell { display: table-cell; padding: 12px 0; border-bottom: 1px solid #eeeeee; vertical-align: top; }
                    .label { width: 140px; color: #999999; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; padding-right: 20px; }
                    .value { color: #1a1a1a; font-size: 15px; font-weight: 500; }
                    
                    /* Footer */
                    .footer { background-color: #f9f9f9; padding: 30px; text-align: center; border-top: 1px solid #eeeeee; }
                    .footer-text { font-size: 12px; color: #999999; }
                    .footer-link { color: #2b45f5; text-decoration: none; font-weight: 500; }
                    
                    /* Button */
                    .btn-container { margin-top: 30px; text-align: center; }
                    .btn { display: inline-block; padding: 12px 24px; background-color: #2b45f5; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 2px; }
                    
                    /* Responsive */
                    @media only screen and (max-width: 600px) {
                        .container { margin: 0; border-radius: 0; }
                        .content { padding: 25px; }
                        .header { padding: 30px 20px; }
                        .cell { display: block; width: 100%; padding: 8px 0; border: none; }
                        .label { margin-bottom: 4px; }
                        .value { margin-bottom: 16px; }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="logo-text">Pixella Labs<span class="accent">.</span></div>
                        <div class="header-badge">${emailTitle}</div>
                    </div>
                    
                    <div class="content">
                        <p class="intro">You received a new ${isAudit ? 'audit request' : 'inquiry'} from your website contact form.</p>
                        
                        <div class="grid">
                            <div class="row">
                                <div class="cell label">Name</div>
                                <div class="cell value">${name}</div>
                            </div>
                            
                            ${company ? `
                            <div class="row">
                                <div class="cell label">Company</div>
                                <div class="cell value">${company}</div>
                            </div>
                            ` : ''}
                            
                            <div class="row">
                                <div class="cell label">Email</div>
                                <div class="cell value"><a href="mailto:${email}" style="color: #2b45f5; text-decoration: none;">${email}</a></div>
                            </div>

                            ${phone ? `
                            <div class="row">
                                <div class="cell label">Phone</div>
                                <div class="cell value">${phone}</div>
                            </div>
                            ` : ''}

                            ${isAudit && websiteUrl ? `
                            <div class="row">
                                <div class="cell label">Website URL</div>
                                <div class="cell value"><a href="${websiteUrl}" target="_blank" style="color: #2b45f5;">${websiteUrl}</a></div>
                            </div>
                            ` : ''}
                            
                            ${!isAudit ? `
                            <div class="row">
                                <div class="cell label">Project Type</div>
                                <div class="cell value">${projectType || 'Not specified'}</div>
                            </div>
                            
                            <div class="row">
                                <div class="cell label">Budget</div>
                                <div class="cell value">${budget || 'Not specified'}</div>
                            </div>
                            ` : ''}
                            
                            <div class="row">
                                <div class="cell label" style="padding-top: 20px;">${isAudit ? 'Pain Points' : 'Details'}</div>
                                <div class="cell value" style="padding-top: 20px; line-height: 1.8;">${details.replace(/\n/g, '<br>')}</div>
                            </div>
                        </div>
                        
                        <div class="btn-container">
                            <a href="mailto:${email}" class="btn">Reply to ${name}</a>
                        </div>
                    </div>
                    
                    <div class="footer">
                        <p class="footer-text">This email was sent from <a href="https://pixellalabs.studio" class="footer-link">Pixella Labs</a> Contact Form.</p>
                        <p class="footer-text" style="margin-top: 8px;">Received on ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully from ${email}`);
        res.json({
            success: true,
            message: 'Email sent successfully!'
        });
    } catch (error) {
        console.error('❌ Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email. Please try again later.'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
