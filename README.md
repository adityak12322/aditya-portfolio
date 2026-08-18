# Aditya Kumar — Portfolio Backend

Backend API for my personal portfolio website, built with Node.js, Express.js and MongoDB.

This backend powers the portfolio's dynamic content and admin panel, allowing portfolio information to be managed without modifying the frontend code.

## 🚀 Features

- Admin authentication with JWT
- Profile / About management
- Project management
- Experience & internship management
- Certificates & credentials management
- Education management
- Social media links management
- Portfolio settings management
- MongoDB database integration
- RESTful API architecture
- Protected admin routes
- CORS enabled
- Environment variable configuration

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- REST APIs

## 📁 Project Structure

backend/
├── config/
├── models/
├── routes/
├── server.js
├── package.json
├── package-lock.json
└── .gitignore

## ⚙️ Installation

Clone the repository:

git clone YOUR_GITHUB_REPOSITORY_URL

Go to the project folder:

cd aditya-portfolio-backend

Install dependencies:

npm install

## 🔐 Environment Variables

Create a `.env` file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

IMPORTANT: Never upload `.env` to GitHub.

Your `.gitignore` should contain:

.env
node_modules/

## ▶️ Run Locally

Start the development server:

npm run dev

Or:

node server.js

The API will run on:

http://aditya-portfolio-backend-jsib.onrender.com

## 🔗 API Endpoints

### Authentication

POST /api/auth/login

Used for admin authentication.

### Profile

GET /api/profile
PUT /api/profile

Manages:

- Name
- Headline
- Summary
- Location
- Email
- Phone
- Profile image
- Resume URL
- Availability

### Projects

GET /api/projects
POST /api/projects
PUT /api/projects/:id
DELETE /api/projects/:id

Manages project title, description, category, technology stack, images, GitHub links and live demo links.

### Experience

GET /api/experience
POST /api/experience
PUT /api/experience/:id
DELETE /api/experience/:id

Supports internships, work experience, training and freelance experience.

### Credentials

GET /api/credentials
POST /api/credentials
PUT /api/credentials/:id
DELETE /api/credentials/:id

Supports:

- Certificates
- Internship Certificates
- LOR
- Degree
- PDC
- Achievements
- Courses
- Other credentials

### Education

GET /api/education
POST /api/education
PUT /api/education/:id
DELETE /api/education/:id

Manages academic information and document links.

### Social Links

GET /api/social
PUT /api/social

Supports:

- GitHub
- LinkedIn
- Instagram
- WhatsApp
- Facebook
- X
- Email
- Phone

### Settings

GET /api/settings
PUT /api/settings

Controls:

- Portfolio title
- Availability status
- Availability message
- Email visibility
- Phone visibility
- Footer year

## 🔒 Authentication

Admin update operations are protected using JWT authentication.

Protected requests use:

Authorization: Bearer YOUR_JWT_TOKEN

## 🌐 Frontend Integration

The frontend communicates with this backend through REST APIs.

Example:

fetch("http://aditya-portfolio-backend-jsib.onrender.com/api/projects")

After deployment, the frontend will use the production backend URL.

## 🗄️ Database

The application uses MongoDB with Mongoose.

MongoDB stores:

- Profile
- Projects
- Experience
- Credentials
- Education
- Social links
- Settings
- Admin authentication data

## 🔮 Future Improvements

- Cloudinary image uploads
- Admin analytics dashboard
- Contact form with email notifications
- Visitor analytics
- Resume download tracking
- Role-based admin access
- API rate limiting
- Production logging
- Automated deployment

## 👨‍💻 Author

Aditya Kumar

Computer Science & Information Technology Graduate

Focus Areas:

- Data Analytics
- Full Stack Development
- QA / Software Testing

## 📄 License

This project is created for personal portfolio and professional showcase purposes.