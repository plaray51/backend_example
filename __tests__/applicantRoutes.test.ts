import request from 'supertest';
import app from '../src/app';

describe('Applicant API endpoints', () => {
  let server: any;
  let createdApplicantId: string;

  beforeAll(async () => {
    server = app.listen(4000);
    // Create a user for testing (tests POST)
    const res = await request(server)
      .post('/awesome/applicant')
      .send({
        name: 'John Doe',
        bio: 'Software engineer with expertise in JavaScript and Node.js',
        skills: ['JavaScript', 'Node.js']
      });
    createdApplicantId = res.body.id;
  });

  afterAll(async () => {
    // Clean up - delete the user created for testing (tests DELETE)
    if (createdApplicantId) {
      await request(server)
        .delete(`/awesome/applicant/${createdApplicantId}`);
      server.close();
    }
  });

  // Test for PUT request (update)
  it('should update the created applicant', async () => {
    const updatedApplicant = {
      name: 'John Smith',
      bio: 'Updated bio for John Smith',
      skills: ['JavaScript', 'Node.js', 'TypeScript']
    };

    const updateRes = await request(server)
      .put(`/awesome/applicant/${createdApplicantId}`)
      .send(updatedApplicant);

    expect(updateRes.statusCode).toEqual(200);
    expect(updateRes.body).toHaveProperty('id', createdApplicantId);
    expect(updateRes.body.name).toEqual(updatedApplicant.name);
    expect(updateRes.body.bio).toEqual(updatedApplicant.bio);
    expect(updateRes.body.skills).toEqual(updatedApplicant.skills);
  });

  // Test for DELETE request
  it('should delete the created applicant', async () => {
    const deleteRes = await request(server)
      .delete(`/awesome/applicant/${createdApplicantId}`);
    
    expect(deleteRes.statusCode).toEqual(204);

    // Ensure the applicant is actually deleted
    const getRes = await request(server).get(`/awesome/applicant/${createdApplicantId}`);
    expect(getRes.statusCode).toEqual(404);
  });

});