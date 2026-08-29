# MDB Auth Server

Centralized authentication server for the MDB ecosystem (Management Dashboard Backend). Handles user registration, login, token validation, and JWT-based authentication for all microservices.

## Features

- User registration and login
- JWT token generation and validation
- Role-based access control ready
- PostgreSQL database with Prisma ORM
- Password hashing with bcrypt
- Session management
- Audit logging

## Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

## Installation

1. Clone and navigate to the project:
```bash
cd MDB-auth-server
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your PostgreSQL connection string and JWT secret

4. Setup database:
```bash
npx prisma migrate dev --name init
```

## Running

Development:
```bash
npm run start:dev
```

Production:
```bash
npm run build
npm run start:prod
```

## API Endpoints

### Register User
```bash
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "User Name",
  "password": "password123"
}
```

### Login
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Validate Token
```bash
POST /auth/validate
Content-Type: application/json

{
  "token": "your-jwt-token"
}
```

### Get User Profile (Protected)
```bash
GET /auth/profile
Authorization: Bearer your-jwt-token
```

### Health Check
```bash
GET /health
```

## Database Schema

- `users`: User accounts with email, name, password, role, and active status
- `sessions`: Active user sessions with tokens and expiration
- `audit_logs`: Audit trail of authentication events

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for signing JWT tokens
- `JWT_EXPIRATION`: Token expiration time (default: 24h)
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)

## Integration with Other Services

All other backend services (MDB-backend, guard-attendance-backend, escort-backend) should remove their auth modules and instead:

1. Validate JWT tokens by calling `/auth/validate`
2. Use the returned user data for authorization
3. Include JWT tokens in requests to protected endpoints

```typescript
// Example: Validate token from other services
const response = await fetch('http://localhost:3001/auth/validate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token: userToken })
});
```
# MDB-auth-server
