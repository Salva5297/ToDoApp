const request = require('supertest');
import app from '../backend';

describe('ToDo APP', () => {
  let id = "1";
  
  // Test for getting all duties
  it('should get all duties', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test for creating a new duty
  it('should create a new duty', async () => {
    const newDuty = { name: 'Test Duty' };
    const res = await request(app)
      .post('/')
      .send(newDuty);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Test Duty');

    // get id for the created duty
    id = res.body.id;

    
  });

  // Test for updating a duty
  it('should update a duty', async () => {
    const updatedDuty = { name: 'Updated Test Duty' };
    const res = await request(app)
      .put(`/${id}`)
      .send(updatedDuty);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Updated Test Duty');
  });


  // Test for deleting a duty
  it('should delete a duty', async () => {
    const res = await request(app)
      .delete(`/${id}`)
      .send();
    
    expect(res.statusCode).toEqual(200);
  });
});