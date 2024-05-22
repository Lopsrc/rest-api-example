const { model } = require('mongoose');

/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('person', {
        id: 'id',
        name: { type: 'text', notNull: true },
        email: { type: 'text', notNull: true},
        age: { type: 'integer', notNull: true },
        del: { 
            type: 'boolean',
            notNull: true, 
            default: false
        },
    });
    pgm.createTable('car', {
        id: 'id',
        brand: { type: 'text', notNull: true },
        model: { type: 'text', notNull: true },
        color: { type: 'text', notNull: true },
        reg_num: { 
            type: 'text', 
            notNull: true, 
            unique: true },
        personId: {
            type: 'integer',
            references: '"person"',
            onDelete: 'cascade',
        },
    });
    pgm.createIndex('person','email');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('car');
    pgm.dropTable('person');
};
