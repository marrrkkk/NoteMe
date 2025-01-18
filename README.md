![alt text](image.png)

# NoteMe

NoteMe is a web application that allows users to send and receive anonymous notes. Users can create their profiles and share them with others. The platform is built using Next.js, Clerk for authentication, and Supabase for the database.

## Features
- Send anonymous notes to users.
- Share your profile with others to receive anonymous notes.
- Create a user profile with a nickname and bio.

## Tech Stack
- **Frontend**: Next.js
- **Authentication**: Clerk ([https://clerk.dev](https://clerk.dev))
- **Database**: Supabase ([https://supabase.io](https://supabase.io))

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/noteme.git
   ```

2. Navigate into the project directory:


   ```bash
   cd NoteMe
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the root directory and add the following environment variables:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
   CLERK_SECRET_KEY=your-clerk-secret-key
   NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/setup

   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   DB_CONNECTION_STRING=your-db-connection-string

   Replace the values with your actual Clerk and Supabase keys.
   ```

5. Run the development server:

   ```bash 
   npm run dev
   ```

6. Open your browser and visit `http://localhost:3000` to view the application.

## Contributing

Feel free to open issues and submit pull requests. Contributions are welcome!

## License

MIT License. See the [LICENSE](LICENSE) file for details.
