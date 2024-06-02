const request = require('supertest');

const app = require('../../src/app');
const users = require('../fixtures/user.fixture');
const cars = require('../fixtures/car.fixture');


const   notValidEmail = 'not-valid-email',
        notFoundEmail = 'notfound@mail.com',  
        bigNumber     =  1e6;


describe('Routes. Fail Cases', () =>{
    describe('User', () =>{
        describe('Create a user', () =>{

            test('should return error "User is already exist"', async () =>{
                let res = await request(app)
                .post('/api/v1/user')
                .send(users.createUser);
                
                users.createUser.id = res.body.data.id;
                expect(res.status).toBe(201);
    
                res = await request(app)
                .post('/api/v1/user')
                .send(users.createUser);
                
                expect(res.status).toBe(400);
                expect(res.body.data).toBe('User is already exist');
            });
            test('should return error "invalid credentials"', async () =>{
                let res = await request(app)
                .post('/api/v1/user')
                .send({});

                expect(res.status).toBe(400);
                expect(res.body.data).toBe('invalid credentials');
            });
        });
        describe('Get a user', () => {

            test('should return error "invalid credentials"', async () =>{
                const res = await request(app)
                .get(`/api/v1/user/${notValidEmail}`)
                .send();
                
                expect(res.status).toBe(400);
                expect(res.body.data).toBe('invalid credentials');
    
            });
            test('should return error "User is not exist"', async () =>{
                const res = await request(app)
                .get(`/api/v1/user/${notFoundEmail}`)
                .send();
    
                expect(res.status).toBe(400);
                expect(res.body.data).toBe('User is not exist');

            });
        });
        describe('Update a user', () => {

            test('should return error "invalid credentials"', async () =>{
                users.updateUser.email = notValidEmail;
                const res = await request(app)
                .put('/api/v1/user')
                .send(users.updateUser);
    
                expect(res.status).toBe(400);
                expect(res.body.data).toBe('invalid credentials');
            });
            
            test('should return error "User is not exist"', async () =>{
                users.updateUser.email = notFoundEmail;
                const res = await request(app)
                .put('/api/v1/user')
                .send(users.updateUser);
    
                expect(res.status).toBe(400);
                expect(res.body.data).toBe('User is not exist');
            
            });
        });
        describe('Get all users', () => {
            test('should return a status code 404', async () =>{
                let res = await request(app)
                .get('/api/v1/users') // not valid endpoint ('users' instead of 'user')
                .send();
    
                expect(res.status).toBe(404);
            });
        });
        describe('Delete a user', () => {
            
            test('should return error "invalid credentials"', async () =>{
                const res = await request(app)
                .delete(`/api/v1/user/${notValidEmail}`)
                .send();
                
                expect(res.status).toBe(400);
                expect(res.body.data).toBe('invalid credentials');
    
            });
            
            test('should return an error "User is not exist"', async () => {
                const res = await request(app)
                .delete(`/api/v1/user/${notFoundEmail}`)
                
                expect(res.status).toBe(400);
                expect(res.body.data).toBe('User is not exist');

            });
        });
        describe('Recover a user', () => {

            test('should return an error "invalid credentials"', async () =>{
                const res = await request(app)
                .put(`/api/v1/user/${notValidEmail}`)
                .send();
                
                expect(res.status).toBe(400);
                expect(res.body.data).toBe('invalid credentials');
    
            });
            test('should return an error "User is not exist"', async () => {
                const res = await request(app)
                .put(`/api/v1/user/${notFoundEmail}`)
    
                expect(res.status).toBe(400);
                expect(res.body.data).toBe('User is not exist');

            });
        });
    });

    describe('Car', () =>{
        describe('Create a car', () => {
            test('should create a car', async () =>{
                cars.createCar.id = users.createUser.id;
                const res = await request(app)
                .post('/api/v1/car')
                .send(cars.createCar);
                
                cars.updateCar.id = res.body.data;
                expect(res.status).toBe(201);
            });
            test('should return an error "Car is already exist"', async () =>{
                const res = await request(app)
                .post('/api/v1/car')
                .send(cars.createCar);
                
                expect(res.status).toBe(400);
                expect(res.body.data).toBe('Car is already exist');

            });
            test('should return error "User is not exist"', async () =>{
                cars.createCar.id = bigNumber; // user with such an id does not exist
                const res = await request(app)
                .post('/api/v1/car')
                .send(cars.createCar);
                
                expect(res.status).toBe(400);
                expect(res.body.data).toBe('User is not exist');                
                
            });
            test('should return error "invalid credentials"', async () =>{
                const res = await request(app)
                .post('/api/v1/car')
                .send({});
    
                expect(res.status).toBe(400);
                expect(res.body.data).toBe('invalid credentials');
            });	
        });
        describe('Get a car', () => {

            test('should return an error "invalid credentials"', async () =>{
    
                const res = await request(app)
                .get(`/api/v1/car/${0}`)
                .send();
                
                expect(res.status).toBe(400);
                expect(res.body.data).toBe('invalid credentials');
    
            });
            test('should return an error "Car is not exist"', async () =>{
                const res = await request(app)
                .get(`/api/v1/car/${bigNumber}`)
                .send();
    
                expect(res.status).toBe(400);
                expect(res.body.data).toBe('Car is not exist');

            });
        });
        describe('Update a car', () => {
            let notValidCar = {
                id: cars.updateCar.id,
                brand: cars.updateCar.brand,
                regNum: 0, // invalid
                model: cars.updateCar.model,
                color: cars.updateCar.color,
            }
            test('should return an error "invalid credentials"', async () =>{
                res = await request(app)
                .put('/api/v1/car')
                .send(notValidCar);
    
                expect(res.status).toBe(400);
                expect(res.body.data).toBe('invalid credentials');
                
            });
            test('should return an error "Car is not exist"', async () =>{
                notValidCar.id = bigNumber;
                notValidCar.regNum = cars.updateCar.regNum // valid regNum 
                const res = await request(app)
                .put('/api/v1/car')
                .send(notValidCar);
    
                expect(res.status).toBe(400);
                expect(res.body.data).toBe('Car is not exist');
                
            });
            test('should return an error "Car is already exist"', async () => {
                let newCar = {
                    id: users.createUser.id,
                    brand: 'someBrand',
                    model: 'someModel',
                    color: 'someColor',
                    regNum: cars.updateCar.regNum,
                };
                let res = await request(app)
                .post('/api/v1/car')
                .send(newCar);
                
                newCar.id = res.body.data;
                expect(res.status).toBe(201);

                newCar.regNum = cars.createCar.regNum // not valid regNum 
                res = await request(app)
                .put('/api/v1/car')
                .send(newCar);
    
                expect(res.status).toBe(400);
                expect(res.body.data).toBe('Car is already exist');
            });
        });
        describe('Get all cars', () => {

            test('should return a status code 404', async () =>{
                const res = await request(app)
                .get(`/api/v1/cars`) // endpoint is not valid.
                .send();
                
                expect(res.status).toBe(404);
            });
        });
        describe('Delete a car', () => {

            test('should return an error "invalid credentials"', async () =>{
                const res = await request(app)
                .delete(`/api/v1/car/${0}`)
                .send();
                
                expect(res.status).toBe(400);
                expect(res.body.data).toBe('invalid credentials');
    
            });
            test('should return an error "Car is not exist"', async () =>{
                const res = await request(app)
                .delete(`/api/v1/car/${bigNumber}`)
                .send();
                
                expect(res.status).toBe(400);
                expect(res.body.data).toBe('Car is not exist');
                
            });
        });
    });
});