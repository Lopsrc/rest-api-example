const request = require('supertest');

const app = require('../../src/app');
const pool = require('../../src/pkg/clients/postgres/client');

describe('Connections', () => {
    test('should connect to the Database', async () =>{
        const p = await pool.connect();
        expect(p._connected).toBe(true); 
        p.end();
    });
    
    test('should connect to the Server', async () =>{
        const res = await request(app)
        .get('/health')

        expect(res.status).toBe(200);
    })
})