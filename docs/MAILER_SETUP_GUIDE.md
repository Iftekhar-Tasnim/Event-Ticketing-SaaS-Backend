# Mailer Setup Guide

This guide explains how to configure and use the email functionality in the Event Ticketing System.

## 📧 Overview

The application uses `@nestjs-modules/mailer` with `nodemailer` to send emails for:
- **Staff Invitations** - When TenantAdmin invites staff members
- **Staff Registration** - When staff accounts are created
- **Ticket Check-in Confirmations** - When tickets are checked in at events

## 🔧 Configuration

### Step 1: Create `.env` File

Create a `.env` file in the root directory with the following variables:

```env
# SMTP Server Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465

# Gmail Account Email
SMTP_USER=your-email@gmail.com

# Gmail App Password (NOT your regular password!)
SMTP_PASS=your-16-character-app-password
```

### Step 2: Generate Gmail App Password

**IMPORTANT:** You cannot use your regular Gmail password. You must generate an App Password:

1. **Enable 2-Step Verification:**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification if not already enabled

2. **Generate App Password:**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" as the app
   - Select "Other (Custom name)" as the device
   - Enter "Event Ticketing System" as the name
   - Click "Generate"
   - Copy the 16-character password (spaces don't matter)

3. **Add to `.env` file:**
   ```env
   SMTP_PASS=abcd efgh ijkl mnop
   ```
   (You can include or remove spaces - both work)

### Step 3: Verify Configuration

The mailer is automatically configured when the application starts. Check the console for any connection errors.

## 📬 Email Features

### 1. Staff Invitation Email

**Triggered when:** TenantAdmin invites a staff member via `POST /tenant-admin/tenant-users`

**Recipient:** The invited staff member's email

**Content:**
- Welcome message
- Login credentials (email and password)
- Instructions to change password

**Example:**
```
Subject: Staff Invitation - Event Ticketing System

Hello John Doe,

You have been invited to join as a staff member for the Event Ticketing System.

Your login credentials:
- Email: john@example.com
- Password: Password@123

Please login and change your password for security.
```

### 2. Staff Registration Email

**Triggered when:** Staff member registers via `POST /staff/register`

**Recipient:** The staff member's email

**Content:**
- Welcome message
- Account confirmation
- Login instructions

### 3. Ticket Check-in Confirmation Email

**Triggered when:** Staff checks in a ticket via `POST /staff/:id/checkin`

**Recipient:** The ticket attendee's email

**Content:**
- Check-in confirmation
- Event name
- Ticket ID
- Check-in timestamp

**Example:**
```
Subject: Ticket Check-in Confirmation - Event Ticketing System

Hello Jane Smith,

Your ticket has been successfully checked in for Summer Music Festival 2024.

Ticket Details:
- Ticket ID: 50000000-0000-0000-0000-000000000001
- Checked in at: 1/27/2025, 2:30:00 PM

Thank you for attending!
```

## 🛠️ Technical Details

### Module Configuration

The mailer is configured in `src/app.module.ts`:

```typescript
MailerModule.forRoot({
  transport: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
  defaults: {
    from: `"Event Ticketing System" <${process.env.SMTP_USER}>`,
  },
})
```

### Error Handling

Email sending errors are caught and logged but **do not fail** the main operation:

```typescript
try {
  await this.mailerService.sendMail({...});
} catch (error) {
  console.error('Failed to send email:', error);
  // Main operation continues successfully
}
```

This ensures that:
- User creation/invitation succeeds even if email fails
- Ticket check-in succeeds even if confirmation email fails
- Errors are logged for debugging

## 🚀 Testing

### Test Email Sending

1. **Start the application:**
   ```bash
   npm run start:dev
   ```

2. **Invite a staff member:**
   ```bash
   POST /tenant-admin/tenant-users
   {
     "email": "test@example.com",
     "password": "Test@123",
     "fullName": "Test User"
   }
   ```

3. **Check the email inbox** for the invitation email

### Verify SMTP Connection

If emails are not being sent, check:

1. **Console logs** for SMTP connection errors
2. **Gmail App Password** is correct (16 characters)
3. **2-Step Verification** is enabled
4. **Firewall/Network** allows SMTP connections on port 465

## 🔒 Security Best Practices

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use App Passwords** - Never use your regular Gmail password
3. **Rotate passwords** - Change App Passwords periodically
4. **Limit access** - Only authorized services should have SMTP credentials

## 📊 Production Considerations

### Gmail Limitations

- **Free Gmail:** ~500 emails per day
- **Rate limiting:** May throttle if sending too many emails quickly

### Recommended Production Services

For production, consider using dedicated email services:

1. **SendGrid** (sendgrid.com)
   - 100 emails/day free tier
   - Better deliverability
   - Analytics and tracking

2. **AWS SES** (aws.amazon.com/ses)
   - Pay-as-you-go pricing
   - High deliverability
   - Integrates with AWS services

3. **Mailgun** (mailgun.com)
   - 5,000 emails/month free tier
   - Good for transactional emails

4. **Postmark** (postmarkapp.com)
   - Focused on transactional emails
   - Excellent deliverability

### Updating for Production Service

To use a different email service, update the transport configuration in `app.module.ts`:

```typescript
// Example: SendGrid
MailerModule.forRoot({
  transport: {
    service: 'SendGrid',
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY,
    },
  },
})
```

## 🐛 Troubleshooting

### Common Issues

1. **"Invalid login" error:**
   - Verify App Password is correct
   - Ensure 2-Step Verification is enabled
   - Check for extra spaces in password

2. **"Connection timeout":**
   - Check firewall settings
   - Verify SMTP port (465 for SSL)
   - Check network connectivity

3. **Emails not received:**
   - Check spam folder
   - Verify recipient email is correct
   - Check Gmail sending limits (500/day)
   - Review console logs for errors

4. **"Authentication failed":**
   - Regenerate App Password
   - Ensure using App Password, not regular password
   - Check SMTP_USER matches the account with App Password

## 📝 Summary

The mailer is now fully integrated and will automatically send emails for:
- ✅ Staff invitations
- ✅ Staff registrations  
- ✅ Ticket check-in confirmations

Just configure your `.env` file with Gmail credentials and you're ready to go!

For questions or issues, check the console logs for detailed error messages.

