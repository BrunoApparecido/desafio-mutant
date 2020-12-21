module.exports = {
    "type": "mysql",
    "host": process.env.DB_HOST || "localhost",
    "port": process.env.DB_PORT || 3306,
    "username": process.env.DB_USER || "admin",
    "password": process.env.DB_PASSWORD || "admin",
    "database": process.env.DB_DATABASE || "mutant",
    "entities": [
        "build/entities/**/*.{ts,js}"
    ],
    "migrations": [
        "build/migration/**/*.{ts,js}"
    ],
    "cli": {
        "entitiesDir": "src/entities",
        "migrationsDir": "src/migration"
    }
}