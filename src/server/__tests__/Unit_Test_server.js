/*--------------------------------------------------------
Unit Test for the server code for the App. UDACITY Project - Front End Developper Nanodegree
version: 1.0.0
created on: 22/06/20
last modified: 22/06/20
Updates:
22/06/20    File Creation
author: E. RONDON
----------------------------------------------------------*/
import 'regenerator-runtime/runtime'
const request = require('supertest')
const app = require('../server')

describe('Test Post Endpoint', () => {
    test('should create a new post', async () => {
      const res = await request(app)
        .post('/trips')
        .send({
            id: 101,
            title: 'foo',
            body: 'bar',
            userId: 1
          })
        const stringJSON = `{"id":101,"title":"foo","body":"bar","userId":1}`;
          let jsonRes = JSON.stringify(res.body);
          expect(jsonRes).toEqual(stringJSON);
    })
  })