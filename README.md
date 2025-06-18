# INAB Core Backend

A robust budget management system built with TypeScript, GraphQL, and Domain-Driven Design (DDD) principles. This backend service provides comprehensive budget tracking, account management, and transaction handling capabilities.

## 🚀 Features

- **Budget Management**: Create and manage budgets with categories and subcategories
- **Account Management**: Track multiple accounts within budgets
- **Transaction Tracking**: Record and categorize financial transactions
- **GraphQL API**: Modern, type-safe API with Apollo Server
- **Domain-Driven Design**: Clean architecture with proper separation of concerns
- **TypeScript**: Full type safety and modern JavaScript features
- **PostgreSQL**: Reliable database storage with Mongoose ODM
- **Docker Support**: Easy deployment and development setup

## 🏗️ Architecture

This project follows Domain-Driven Design principles with a clean architecture:

```
src/
├── infra/           # Infrastructure layer (database, GraphQL)
├── modules/         # Business modules (budgets, accounts)
├── shared/          # Shared domain and core utilities
└── ...
```

### Key Components

- **Domain Layer**: Business entities, value objects, and domain logic
- **Application Layer**: Use cases and application services
- **Infrastructure Layer**: Database, GraphQL resolvers, and external services
- **Shared Core**: Common utilities, guards, and base classes

## 📋 Prerequisites

- Node.js 14+ 
- Yarn package manager
- Docker and Docker Compose (for containerized setup)
- PostgreSQL (if running locally)

## 🛠️ Installation & Setup

### Option 1: Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd inab-core
   ```

2. **Set up environment variables**
   ```bash
   cp .env.sample .env
   # Edit .env with your configuration
   ```

3. **Build and run with Docker Compose**
   ```bash
   docker-compose build
   docker-compose up -d
   ```

4. **Access the application**
   - GraphQL Playground: http://localhost:3001/graphql
   - API Endpoint: http://localhost:3001

### Option 2: Local Development

1. **Install dependencies**
   ```bash
   yarn install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.sample .env
   # Configure your database and other settings
   ```

3. **Start PostgreSQL** (if not using Docker)
   ```bash
   # Start your PostgreSQL instance
   # Update .env with your database credentials
   ```

4. **Run the application**
   ```bash
   # Development mode with hot reload
   yarn start:dev
   
   # Production build
   yarn build
   yarn start
   ```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `yarn start:dev` | Start development server with hot reload |
| `yarn start` | Build and start production server |
| `yarn build` | Compile TypeScript to JavaScript |
| `yarn test` | Run tests in watch mode |
| `yarn test:build` | Run tests once |
| `yarn code:format` | Format code with Prettier |
| `yarn code:check` | Check code formatting |
| `yarn clean` | Clean build artifacts |

## 🗄️ Database

The application uses PostgreSQL with Mongoose ODM. The database schema includes:

- **Budgets**: Main budget entities
- **Accounts**: Financial accounts within budgets
- **Categories**: Budget categories and subcategories
- **Transactions**: Financial transaction records

## 📡 GraphQL API

The application exposes a GraphQL API with the following main types:

### Budget Operations
- `createBudget`: Create a new budget
- `getBudget`: Retrieve budget details
- `getAccountsByBudgetId`: Get accounts for a specific budget

### Account Operations
- `createAccount`: Create a new account within a budget

### Example Query
```graphql
query GetBudget($id: String!) {
  budget(id: $id) {
    id
    name
    description
    accounts {
      id
      name
      balance
    }
  }
}
```

## 🧪 Testing

The project includes comprehensive test coverage:

```bash
# Run all tests
yarn test

# Run tests once
yarn test:build

# Run specific test file
yarn test path/to/test.spec.ts
```

Tests are organized to mirror the source code structure and include:
- Unit tests for domain entities and value objects
- Integration tests for use cases
- Mock implementations for repositories

## 🏗️ Development Guidelines

### Code Style
- Use Prettier for code formatting
- Follow TypeScript best practices
- Implement proper error handling with Result pattern
- Use dependency injection with TypeDI

### Architecture Principles
- Follow Domain-Driven Design principles
- Keep business logic in the domain layer
- Use use cases for application logic
- Implement proper separation of concerns

### Adding New Features
1. Define domain entities and value objects
2. Create use cases for business logic
3. Implement repository interfaces and implementations
4. Add GraphQL resolvers and types
5. Write comprehensive tests

## 🐳 Docker

The application is containerized with Docker:

- **Development**: Uses volume mounts for hot reload
- **Production**: Optimized build with multi-stage Dockerfile
- **Database**: PostgreSQL container with persistent storage

### Docker Commands
```bash
# Build image
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📝 Environment Variables

Create a `.env` file based on `.env.sample` with the following variables:

```env
# Database
DB_NAME=inab_core
DB_USER=postgres
DB_PASSWORD=your_password
DB_VOLUME_PATH=./postgres-data

# Server
PORT=3001
NODE_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the GraphQL Playground for API documentation
- Review the test files for usage examples

---

**Built with ❤️ using TypeScript, GraphQL, and Domain-Driven Design**
