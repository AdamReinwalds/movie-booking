# Movie Booking Project

This is a movie booking application built with **React** using the standard **Create React App (CRA)** setup.

## 📚 Project Overview

The application simulates a movie booking system where users can browse movies, book seats for specific shows, and manage movie listings. Admins can add, update, or "soft delete" movies using the admin page.

## 🚀 Features

- **Main Page:**
  - View available movies with their details.
  - Book seats for individual movie shows.
- **Admin Page:**

  - Add new movies to the database.
  - Update movie details, such as title and pricing.
  - "Soft delete" movies by marking them as unavailable.

- **Routing:**
  - Implemented using **React Router DOM** to navigate between the main and admin pages.

## 📡 Backend

- **Mock REST API:**
  - The project uses **json-server** as a mock RESTful API for handling movie data and booking information.
  - CRUD operations are performed to add, retrieve, update, and soft delete movie entries.

## 🛠️ Technologies Used

- **React** (with standard CRA setup)
- **React Router DOM** for navigation
- **json-server** for backend simulation

## 💾 How to Run the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/AdamReinwalds/movie-booking
   cd movie-booking
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the mock backend using json-server:

   ```bash
   json-server --watch data/db.json
   ```

4. Start the frontend development server:

```bash
npm start
```

5. Open the application in your browser at [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure

```
├── public
├── src
│   ├── components
│   ├── pages
│   ├── App.js
│   ├── index.js
│   └── dataHandler.js
├── data
│   ├── db.json
└── README.md
```

## 🌟 Future Improvements

- Add user authentication for admin access.
- Add genre to each movie and date it takes place.
- Implement search and filtering options for movies.
- Implement booking based on date.
- Implement backend persistence with a real database and server.

## 📝 Notes

- Booking functionality and data management are for demonstration purposes only.
- Soft delete feature keeps movie entries in the database but hides them from the main page.
