import request from 'supertest';

import app from '../app';

describe('posts/', () => {
  describe('GET posts/:id', () => {
    it('GET posts/:existedId => 200', async () => {
      const id = '6de5dc17-62bb-4d4c-a779-4101bfea8294';

      const response = await request(app).get(`/api/posts/${id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(id);
    });
    it('GET posts/:undefinedId => 404', async () => {
      const id = 'undefinedId';

      const response = await request(app).get(`/api/posts/${id}`);

      expect(response.statusCode).toBe(404);
    });
  });
  describe('GET posts/all', () => {
    it('GET posts/all => 200', async () => {
      const response = await request(app).get(`/api/posts/all`);

      expect(response.statusCode).toBe(200);
    });
  });
  describe('GET posts/all/:id', () => {
    it('GET posts/all/:existed_UserId => 200', async () => {
      const userId = '863f78b8-13ee-49c1-925e-dc279f101e6c';

      const response = await request(app).get(`/api/posts/all/${userId}`);

      expect(response.statusCode).toBe(200);
    });
    it('GET client posts/all/:undefined_UserId => 200', async () => {
      const userId = '1';

      const response = await request(app).get(`/api/posts/all/${userId}`);

      expect(response.statusCode).toBe(400);
    });
  });
  describe('POST posts/ (token)', () => {
    it('POST posts/ => 200 (header: exist token)', async () => {
      const userToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImRhIiwiaWQiOiJlYWIxNDczNi1jNDBlLTRkOTktOGRiZS0xNjAxYWY0NDEyOTUiLCJpYXQiOjE2ODYyODg1MDcsImV4cCI6MTY4NjM3NDkwN30.uwNuyc5gyaaexP4yOlG_tdxMuYf-7qYvupsMJZ7ND8A';

      const response = await request(app)
        .post(`/api/posts/`)
        .send({
          title: 'fdasasgf',
          text: 'rewerw',
          tags: '549763ed-42f4-43c8-91d4-2eec8af50742',
        })
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.statusCode).toBe(200);
    });
    it('POST posts/ => 401 (header: undefined token)', async () => {
      const userToken = '1';

      const response = await request(app)
        .post(`/api/posts/`)
        .send({
          title: 'fdasasgf',
          text: 'rewerw',
          tags: '549763ed-42f4-43c8-91d4-2eec8af50742',
        })
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.statusCode).toBe(401);
    });
  });
});
