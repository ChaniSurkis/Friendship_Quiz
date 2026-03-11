# Friendship Quiz
### Friendship Quiz Management System

**Friendship Quiz** is a backend-driven application designed for creating and managing personalized friendship quizzes. The platform enables users to participate in interactive quizzes, authenticate securely, and receive automated email notifications for quiz-related events.


---

## Overview

Friendship Quiz simulates a full-featured friendship quiz platform where users can answer questions and interact with the system through a set of secured, well-structured API endpoints. The project places a strong emphasis on user authentication, robust data persistence, and clean backend architecture — making it a solid foundation for a scalable quiz management system.

---

## Features

- 🧩 **Quiz Creation & Participation** — Users can create quizzes and invite others to participate, enabling a dynamic and interactive experience.
- 🔐 **JWT-Based Authentication** — Secure user authentication and session management using JSON Web Tokens (JWT), ensuring that all sensitive endpoints are protected.
- 🛡️ **Secure API Endpoints** — All routes are designed with security in mind, enforcing authentication and authorization where required.
- 🗄️ **SQL Server Data Persistence** — Reliable and structured data storage using Microsoft SQL Server, ensuring data integrity and efficient querying.
- 📧 **Email Notifications** — Automated email alerts keep users informed of quiz invitations, completions, and other relevant events.
- ⚡ **Modern JavaScript (ES6+)** — Built using contemporary JavaScript standards for clean, maintainable, and efficient code.

---

## Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Server-side runtime environment |
| JavaScript (ES6+) | Core programming language |
| SQL Server | Relational database and data persistence |
| JWT (JSON Web Tokens) | Secure user authentication |
| Email Notification Service | Automated event-driven notifications |
| RESTful API | Structured client-server communication |

---

## Getting Started

> ⚠️ Full setup instructions will be provided as the project matures. The steps below outline the general setup flow.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- Microsoft SQL Server
- A configured email service (e.g., SMTP, SendGrid)

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/friendship-quiz.git

# Navigate to the project directory
cd friendship-quiz

# Install dependencies
npm install
```

### Configuration

Create a `.env` file in the root directory and provide the required environment variables:
```env
DB_HOST=your_sql_server_host
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
EMAIL_SERVICE=your_email_service
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

### Running the Server
```bash
npm start
```

---

## Development Status

This project is in its **early development stage**. Core features are being actively built and refined. Additional functionality, improved documentation, and extended test coverage are planned for upcoming iterations.

Contributions, suggestions, and feedback are welcome as the project evolves.

---

## License

This project was developed for **educational and portfolio purposes**. Feel free to explore the codebase, and reach out if you're interested in collaborating.
