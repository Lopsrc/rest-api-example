const request = require('supertest');

const app = require('../../src/app');
const users = require('../fixtures/user.fixture');
const cars = require('../fixtures/car.fixture');

describe('Routes. Happy Path', () =>{
    describe('User', () =>{
        test('should create a user', async () =>{
            const res = await request(app)
            .post('/api/v1/user')
            .send(users.createUser);
            
            users.createUser.id = res.body.data.id;
            expect(res.status).toBe(201);
        });
        test('should get a user', async () =>{
            const res = await request(app)
            .get(`/api/v1/user/${users.createUser.email}`)
            .send();
            
            expect(res.status).toBe(200);
            expect(res.body.data.name).toBe(users.createUser.name);
        });
        test('should update a user', async () =>{
            const res = await request(app)
            .put('/api/v1/user')
            .send(users.updateUser);

            expect(res.status).toBe(200);
            expect(res.body.data.id).toBe(users.createUser.id);
        });
        test('should get all users', async () =>{
            const res = await request(app)
            .get('/api/v1/user')
            .send();

            expect(res.status).toBe(200);
            
        });
        test('should delete a user', async () =>{
            const res = await request(app)
            .delete(`/api/v1/user/${users.createUser.email}`)
            .send();
            
            expect(res.status).toBe(200);
            expect(res.body.isDel).toBe(true);
        });
        test('should recover a user', async () =>{
            const res = await request(app)
            .put(`/api/v1/user/${users.createUser.email}`)
            .send();
            
            expect(res.status).toBe(200);
            expect(res.body.isRec).toBe(true);
        });
    });

    describe('Car', () =>{
        
        test('should create a car', async () =>{
            cars.createCar.id = users.createUser.id;
            res = await request(app)
            .post('/api/v1/car')
            .send(cars.createCar);
            
            cars.updateCar.id = res.body.data;
            expect(res.status).toBe(201);
            
        });
        test('should get a car', async () =>{
            const res = await request(app)
            .get(`/api/v1/car/${cars.updateCar.id}`)
            .send();
            
            expect(res.status).toBe(200);
            expect(res.body.data.reg_num).toBe(cars.createCar.regNum);
        });
        test('should update a car', async () =>{
            const res = await request(app)
            .put('/api/v1/car')
            .send(cars.updateCar);

            expect(res.status).toBe(200);
            expect(res.body.data).toBe(cars.updateCar.id);
        });
        test('should get all cars', async () =>{
            const res = await request(app)
            .get(`/api/v1/car`)
            .send();
            
            expect(res.status).toBe(200);
            expect(res.body.data[0].reg_num).toBe(cars.updateCar.regNum);
        });
        test('should delete a car', async () =>{
            const res = await request(app)
            .delete(`/api/v1/car/${cars.updateCar.id}`)
            .send();
            
            expect(res.status).toBe(200);
            expect(res.body.isDel).toBe(true);
        });
    });
});

