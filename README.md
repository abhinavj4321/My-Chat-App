# 💬 Real-Time Scalable Chat Application

A **production-oriented, real-time chat application** built using a microservices architecture with **Next.js, Node.js, Socket.io, RabbitMQ, Redis, MongoDB, and AWS**.

The application provides real-time messaging, OTP-based authentication, asynchronous email processing, Redis-powered caching and pub/sub, and independently deployable backend services.








🌐 **Live Demo:**
http://16.192.57.132:3000/login

---

## ✨ Features

* 🔐 **OTP-based Authentication**

  * Email-based OTP verification
  * Secure authentication flow
  * Redis-backed OTP/session handling

* 💬 **Real-Time Messaging**

  * Instant message delivery using Socket.io
  * WebSocket-based bidirectional communication
  * Real-time chat updates without page refresh

* ⚡ **Redis Pub/Sub**

  * Enables communication between chat service instances
  * Supports scalable real-time message distribution
  * Reduces unnecessary database operations

* 📨 **Asynchronous Email Processing**

  * RabbitMQ-based event-driven email processing
  * OTP and notification emails handled independently
  * Prevents email operations from blocking user requests

* 🧩 **Microservices Architecture**

  * User, Chat, and Mail services are independently managed
  * Services can be developed, deployed, and scaled separately
  * Event-driven communication between services

* 🗄️ **MongoDB Persistence**

  * Stores user and chat-related data
  * Persistent chat history

* ☁️ **AWS Deployment**

  * Backend services deployed on AWS
  * Production-oriented service architecture
  * Environment-specific configuration

---

# 🏗️ Architecture

The application follows a **microservices architecture** where the frontend communicates with multiple backend services.

```text
                         ┌──────────────────────┐
                         │      Next.js         │
                         │       Frontend       │
                         └──────────┬───────────┘
                                    │
                 ┌──────────────────┼──────────────────┐
                 │                  │                  │
              REST API          WebSocket           REST API
                 │                  │                  │
                 ▼                  ▼                  ▼
        ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
        │  User Service  │ │  Chat Service  │ │  Mail Service  │
        │                │ │                │ │                │
        │ Authentication │ │ Real-Time Chat │ │ OTP / Emails   │
        │ User Management│ │ Chat History   │ │ Notifications  │
        └───────┬────────┘ └───────┬────────┘ └───────┬────────┘
                │                  │                  │
                │                  │                  │
                │          ┌───────┴────────┐         │
                │          │                │         │
                ▼          ▼                ▼         ▼
        ┌──────────────────────┐     ┌──────────────────────┐
        │       MongoDB        │     │        Redis         │
        │                      │     │                      │
        │ Users / Messages     │     │ Cache / Sessions     │
        │ Persistent Storage   │     │ Pub/Sub / OTP        │
        └──────────────────────┘     └──────────────────────┘
                                          
                                  ┌──────────────────────┐
                                  │       RabbitMQ        │
                                  │   Message Broker      │
                                  │                      │
                                  │ Async Service Events │
                                  └──────────┬───────────┘
                                             │
                                             ▼
                                      ┌──────────────┐
                                      │ Mail Service │
                                      └──────────────┘
```

---

# 🧩 Microservices

The backend is divided into three independent services.

### 👤 User Service

Responsible for:

* User registration
* User authentication
* User profile management
* OTP generation and verification
* Authentication-related operations
* Communication with Redis and MongoDB

**Directory:**

```text
backend/user/
```

---

### 💬 Chat Service

Responsible for:

* Real-time messaging
* WebSocket connections
* Chat rooms
* Message persistence
* Chat history
* Redis Pub/Sub communication
* Real-time message broadcasting

**Directory:**

```text
backend/chat/
```

---

### 📧 Mail Service

Responsible for:

* Processing email events
* Sending OTP emails
* Sending verification emails
* Asynchronous email delivery

The service consumes events from RabbitMQ instead of making email delivery part of the main request-response cycle.

**Directory:**

```text
backend/mail/
```

---

# 🔄 Communication Flow

### Authentication / OTP Flow

```text
User
 │
 ▼
Next.js Frontend
 │
 ▼
User Service
 │
 ├── Generate OTP
 │
 ▼
Redis
 │
 └── Store OTP
 │
 ▼
RabbitMQ
 │
 ▼
Mail Service
 │
 ▼
Email Provider
 │
 ▼
User's Inbox
```

The OTP is generated by the backend, stored temporarily in Redis, and the email delivery request is processed asynchronously through RabbitMQ.

---

### 💬 Real-Time Message Flow

```text
User A
   │
   ▼
Next.js Client
   │
   │ WebSocket
   ▼
Chat Service
   │
   ├──────────────► Redis Pub/Sub
   │                      │
   │                      ▼
   │              Other Chat Instances
   │                      │
   ▼                      ▼
MongoDB              Connected Clients
   │
   ▼
Chat History
```

This architecture allows real-time messages to be distributed across multiple chat-service instances using Redis Pub/Sub.

---

# 🛠️ Tech Stack

| Category                    | Technologies                             |
| --------------------------- | ---------------------------------------- |
| **Frontend**                | Next.js, React, TypeScript, Tailwind CSS |
| **Backend**                 | Node.js, Express.js, TypeScript          |
| **Real-Time Communication** | Socket.io, WebSockets                    |
| **Message Broker**          | RabbitMQ                                 |
| **Caching / Pub/Sub**       | Redis                                    |
| **Database**                | MongoDB                                  |
| **Authentication**          | OTP-based Email Authentication           |
| **Deployment**              | AWS                                      |
| **Process Management**      | PM2                                      |
| **Containerization**        | Docker                                   |

---

# 📁 Project Structure

```text
Real-Time-Chat-Application/
│
├── backend/
│   │
│   ├── user/
│   │   ├── src/
│   │   ├── dist/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── chat/
│   │   ├── src/
│   │   ├── dist/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── mail/
│       ├── src/
│       ├── dist/
│       ├── package.json
│       └── tsconfig.json
│
└── frontend/
    ├── app/
    ├── components/
    ├── context/
    ├── public/
    ├── package.json
    └── next.config.ts
```

> The exact directory structure may vary depending on the current implementation.

---

# 🚀 Getting Started

## Prerequisites

Make sure you have the following installed:

* **Node.js** 18+
* **npm**
* **Git**
* **MongoDB**
* **Redis**
* **RabbitMQ**

You can run MongoDB, Redis, and RabbitMQ locally or through Docker.

---

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/Real-Time-Chat-Application.git

cd Real-Time-Chat-Application
```

---

## 2. Configure Environment Variables

Create environment files for each service.

```text
backend/user/.env
backend/chat/.env
backend/mail/.env
frontend/.env.local
```

Example:

```env
# MongoDB
MONGO_URI=your_mongodb_connection_string

# Redis
REDIS_URL=your_redis_connection_string

# RabbitMQ
RABBITMQ_URL=your_rabbitmq_connection_string

# Authentication
JWT_SECRET=your_secret

# Email
EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
```

> **Never commit real credentials, API keys, passwords, or secrets to GitHub.**

---

# 📦 Install Dependencies

Install dependencies for each backend service.

### User Service

```bash
cd backend/user
npm install
```

### Chat Service

```bash
cd ../chat
npm install
```

### Mail Service

```bash
cd ../mail
npm install
```

### Frontend

```bash
cd ../../frontend
npm install
```

---

# ▶️ Run the Application

Run each backend service in a separate terminal.

### User Service

```bash
cd backend/user
npm run dev
```

### Chat Service

```bash
cd backend/chat
npm run dev
```

### Mail Service

```bash
cd backend/mail
npm run dev
```

Then start the frontend:

```bash
cd frontend
npm run dev
```

The frontend will typically be available at:

```text
http://localhost:3000
```

---

# 🐳 Running Infrastructure with Docker

If Docker is being used for local infrastructure, the required services can be started using Docker containers.

Typical infrastructure:

```text
MongoDB
Redis
RabbitMQ
```

Verify that all services are running before starting the backend microservices.

---

# ☁️ Deployment

The application is deployed on **AWS** with independently running backend services.

High-level deployment architecture:

```text
                         Internet
                            │
                            ▼
                     ┌─────────────┐
                     │    AWS      │
                     │             │
                     │   Server    │
                     └──────┬──────┘
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
     User Service      Chat Service      Mail Service
          │                 │                 │
          └────────────┬────┴────────────┬────┘
                       │                 │
                       ▼                 ▼
                    MongoDB           Redis
                                         │
                                         ▼
                                     RabbitMQ
```

Services can be managed independently using **PM2** in a production environment.

Example:

```bash
pm2 start dist/index.js --name user-service
pm2 start dist/index.js --name chat-service
pm2 start dist/index.js --name mail-service
```

---

# ⚡ Scalability

The architecture is designed to support horizontal scaling.

### Chat Service Scaling

Multiple Chat Service instances can communicate through Redis Pub/Sub:

```text
                    ┌─────────────────┐
                    │     Redis       │
                    │     Pub/Sub     │
                    └───────┬─────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
         Chat Server 1  Chat Server 2  Chat Server 3
              │             │             │
              ▼             ▼             ▼
           Clients       Clients       Clients
```

This prevents users connected to different server instances from being isolated from each other.

---

# 🔒 Security Considerations

The application follows several security-oriented practices:

* Environment variables for sensitive configuration
* JWT-based authentication
* OTP verification for user authentication
* Temporary OTP storage using Redis
* Separation of backend services
* Asynchronous processing for email operations
* Secrets excluded from version control

For production deployments, additional protections such as HTTPS, rate limiting, secure cookies, input validation, and centralized logging should also be configured.

---

# 📈 Future Improvements

Potential improvements include:

* [ ] API Gateway
* [ ] Load Balancer
* [ ] Kubernetes-based deployment
* [ ] Redis Cluster
* [ ] RabbitMQ clustering
* [ ] Centralized logging
* [ ] Monitoring with Prometheus and Grafana
* [ ] Automated CI/CD pipeline
* [ ] Message delivery/read receipts
* [ ] File and image sharing
* [ ] Push notifications
* [ ] End-to-end encryption

---

# 🧪 Development

Build the TypeScript backend services using:

```bash
npm run build
```

Then start the compiled application:

```bash
npm start
```

For development:

```bash
npm run dev
```

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
git commit -m "Add your feature"
```

4. Push the branch

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Abhinav Jaiswal**

Built as a full-stack, microservices-based real-time chat application demonstrating:

* Distributed system design
* Microservices architecture
* Real-time WebSocket communication
* Event-driven architecture
* Redis caching and Pub/Sub
* RabbitMQ message queues
* MongoDB persistence
* AWS deployment
