"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Update with your config settings.
const config = {
    development: {
        client: 'postgresql',
        connection: {
            host: 'roundhouse.proxy.rlwy.net',
            database: 'railway',
            user: 'postgres',
            password: 'b63DfFABfA1*-GbbA233233A6gf31E54',
            port: 11053,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
    staging: {
        client: 'postgresql',
        connection: {
            database: 'twitter_orm',
            user: '',
            password: '',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
    production: {
        client: 'postgresql',
        connection: {
            database: 'twitter_orm',
            user: '',
            password: '',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
};
exports.default = config;
