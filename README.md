# Social Video Challenge Backend

Backend service for a social video app where users can create and join video challenges.

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clonehttps://github.com/thebinod7/nest-social.git
cd your-repo
```

### 2. Install Dependencies

```
pnpm install
```

### 3. Copy `.env` File

```
cp env.example .env
```

### 4. Start the Database via Docker (Skip this if you already have a Postgres DB_URL)

```
docker compose up -d
```

`Make sure PostgreSQL is running and accessible via your DATABASE_URL`

### 5. Run Database Migrations

```
npx prisma migrate dev --name init
```

### 6. Generate Prisma Client

```
npx prisma generate
```

### 7. Start the Development Server

```
pnpm dev
```

Visit http://localhost:8085/swagger for API doc.
