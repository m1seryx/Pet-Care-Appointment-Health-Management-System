# Google OAuth Setup Guide

## Prerequisites
1. A Google Cloud Platform account
2. Access to Google Cloud Console

## Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" or "Google Identity"
   - Click "Enable"

4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - If prompted, configure the OAuth consent screen first:
     - Choose "External" (unless you have a Google Workspace)
     - Fill in required fields (App name, User support email, Developer contact)
     - Add scopes: `profile` and `email`
     - Add test users if needed
   - Application type: "Web application"
   - Name: "Pet Care App" (or your preferred name)
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - `http://localhost:5000` (for backend)
   - Authorized redirect URIs:
     - `http://localhost:5000/api/auth/google/callback`
   - Click "Create"
   - **Save your Client ID and Client Secret**

## Step 2: Update Environment Variables

Create a `.env` file in your `back-end` directory (if it doesn't exist) and add:

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_here
```

**Important:** Never commit your `.env` file to version control!

## Step 3: Update Database Schema

You need to add a `google_id` column to your `user` table:

```sql
ALTER TABLE user ADD COLUMN google_id VARCHAR(255) NULL;
```

This allows users to sign in with Google without a password.

## Step 4: Test the Integration

1. Start your backend server:
   ```bash
   cd back-end
   npm run devStart
   ```

2. Start your frontend:
   ```bash
   cd front-end/pet-care
   npm start
   ```

3. Navigate to the login or signup page
4. Click "Continue with Google"
5. You should be redirected to Google's login page
6. After authentication, you'll be redirected back to your app

## Troubleshooting

### Error: "redirect_uri_mismatch"
- Make sure the redirect URI in your Google Console matches exactly: `http://localhost:5000/api/auth/google/callback`
- Check for trailing slashes or typos

### Error: "invalid_client"
- Verify your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
- Make sure there are no extra spaces in your `.env` file

### Error: "access_denied"
- Check that you've enabled the Google+ API or Google Identity API
- Verify your OAuth consent screen is configured

### Database Error: "Unknown column 'google_id'"
- Run the SQL command from Step 3 to add the `google_id` column

## Security Notes

- Keep your `GOOGLE_CLIENT_SECRET` secure and never expose it in client-side code
- Use environment variables for all sensitive credentials
- In production, use HTTPS and update your redirect URIs accordingly
- Consider adding rate limiting to prevent abuse

