"use strict";

const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
let should = chai.should();

const app = require('../index');

describe('/GET course', () => {
    it('should GET all the courses', () => {
      request(app).get('/course').end((err, res) => {
              expect(res.status).to.eql(200)
            return done();
          });
    });
});

describe('create a post', () => {
  it('should return 200', () => {
    request(app).post('/course/add').end((err,res) => {
      expect(res.status).to.eql(200)
      return done();
    })
  });
});