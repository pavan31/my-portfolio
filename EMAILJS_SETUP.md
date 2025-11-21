# EmailJS Setup Guide

This guide will help you set up EmailJS for the contact form.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)

## Step 2: Create an Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Copy the Service ID** - you'll need this later

## Step 3: Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use the following template variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Message content
   - `{{to_name}}` - Your name (recipient)

Example template:
```
From: {{from_name}} <{{from_email}}>
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

4. **Copy the Template ID** - you'll need this later

## Step 4: Get Your Public Key (User ID)

1. Go to **Account** → **General** in the EmailJS dashboard
2. Find your **Public Key** (User ID)
3. **Copy the User ID** - you'll need this later

## Step 5: Configure Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_USER_ID=your_user_id_here
```

3. Replace the placeholder values with your actual IDs from steps 2, 3, and 4
4. **Important**: The `.env` file is already in `.gitignore` to keep your credentials secure

## Step 6: Restart Your Development Server

After creating/updating the `.env` file:
```bash
npm start
```

## Testing

1. Fill out the contact form on your website
2. Submit the form
3. Check your email inbox for the message
4. Check the browser console for any errors

## Troubleshooting

- **"EmailJS configuration is missing"**: Make sure all three environment variables are set in your `.env` file
- **"Failed to send message"**: Check that your EmailJS service is properly configured and active
- **No email received**: Check your spam folder and verify your EmailJS service settings

## GitHub Pages Deployment

For GitHub Pages, environment variables from `.env` files won't work in production. You have two options:

### Option 1: GitHub Actions with Secrets (Recommended)

1. **Set up GitHub Secrets**:
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Add these three secrets:
     - `REACT_APP_EMAILJS_SERVICE_ID` (your service ID)
     - `REACT_APP_EMAILJS_TEMPLATE_ID` (your template ID)
     - `REACT_APP_EMAILJS_USER_ID` (your user ID)

2. **GitHub Actions Workflow**:
   - A workflow file (`.github/workflows/deploy.yml`) has already been created
   - This workflow will automatically build and deploy when you push to the `main` branch
   - The workflow uses the secrets you just created

3. **Deploy**:
   - Push your code to the `main` branch
   - GitHub Actions will automatically build and deploy
   - Check the **Actions** tab in your repository to see the deployment status

4. **Disable manual deployment** (optional):
   - If you're using GitHub Actions, you can remove the `deploy` script from `package.json` or keep it as a backup

### Option 2: Direct Configuration (Alternative)

If you prefer not to use GitHub Actions, you can directly edit `src/config/emailjs.config.js`:

1. Open `src/config/emailjs.config.js`
2. Replace the empty strings with your actual EmailJS credentials:
   ```javascript
   const emailjsConfig = {
     serviceId: 'your_service_id_here',
     templateId: 'your_template_id_here',
     userId: 'your_user_id_here',
   };
   ```
3. Commit and push the changes

**Note**: EmailJS public keys (User ID) are safe to expose in your code, but using GitHub Secrets is still the recommended approach.

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- For GitHub Pages, use GitHub Actions with secrets (Option 1) for the most secure approach
- EmailJS public keys are designed to be public, but keeping them in secrets is still best practice

