const request = require('supertest');
import app from '../backend'; // Import the Express app

describe('ToDo APP', () => {
  let id = "1"; // Initialize id variable
  
  // Test for getting all duties
  it('Get all duties', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test for creating a new duty
  it('Create new duty', async () => {
    const newDuty = { name: 'Test Duty' };
    const res = await request(app).post('/').send(newDuty);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Test Duty');
    id = res.body.id; // get id for the created duty
  });

  // Test for updating a duty
  it('Update duty', async () => {
    const updatedDuty = { name: 'Updated Test Duty' };
    const res = await request(app).put("/" + id).send(updatedDuty);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Updated Test Duty');
  });

  // Test for updating a duty that not exist
  it('Update duty', async () => {
    const updatedDuty = { name: 'Updated Test Duty' };
    const res = await request(app).put("/9999999").send(updatedDuty);
    expect(res.statusCode).toEqual(404);
  });


  // Test for deleting a duty
  it('Delete duty', async () => {
    const res = await request(app).delete("/" + id).send();
    expect(res.statusCode).toEqual(200);
  });

  // Test for deleting a duty that not exist
  it('Delete duty', async () => {
    const res = await request(app).delete("/999999").send();
    expect(res.statusCode).toEqual(404);
  });

});