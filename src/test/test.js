process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = require('chai').expect;

chai.use(chaiHttp);

describe("Task Force API test", () => {
  describe('/GET Welcome', () => {
    it('it should GET welcome', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('/all unspecified routes', () => {
    it('it should handle all unspecified routes', (done) => {
      chai.request(server)
        .get('/ghyy')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
}
);

// describe('/POST Login user', () => {
//   it('it should check if  user exist', (done) => {
//     chai.request(app)
//         .post('/api/v1/auth/login')
//         .send(userMock.correctInfo)
//         .end((err, res) => {
//           expect(res).to.have.status(201);
//           expect(res.body.status).to.equals("success");
//           expect(res.body.message).to.equals("Login successful");
//           done();
//         });
//   });
//   it('should return error message if email is not valid', (done) => {
//     chai.request(app)
//         .post('/api/v1/auth/login')
//         .send(userMock.InvalidEmail)
//         .end((err, res) => {
//           expect(res).to.have.status(400);
//           expect(res.body.message).to.equals("provide valid email");
//           done();
//         });
//   });
//   it('should return error message if email is not provided', (done) => {
//     chai.request(app)
//         .post('/api/v1/auth/login')
//         .send(userMock.invalidPassword)
//         .end((err, res) => {
//           expect(res).to.have.status(400);
//           expect(res.body.message).to.equals("email is required");
//           done();
//         });
//   });
//   it('should return error message if email is empty', (done) => {
//     chai.request(app)
//         .post('/api/v1/auth/login')
//         .send(userMock.emptyEmail)
//         .end((err, res) => {
//           expect(res).to.have.status(400);
//           expect(res.body.message).to.equals("Email must not be empty");
//           done();
//         });
//   });

//   it('should return error message if password is empty', (done) => {
//     chai.request(app)
//         .post('/api/v1/auth/login')
//         .send(userMock.emptyPassword)
//         .end((err, res) => {
//           expect(res).to.have.status(400);
//           expect(res.body.message).to.equals("password is not allowed to be empty");
//           done();
//         });
//   });
//   it('should return error message if password is not provided', (done) => {
//     chai.request(app)
//         .post('/api/v1/auth/login')
//         .send(userMock.rightEmail)
//         .end((err, res) => {
//           expect(res).to.have.status(400);
//           expect(res.body.message).to.equals("password is required");
//           done();
//         });
//   });
//   it('should return error message if password is short', (done) => {
//     chai.request(app)
//         .post('/api/v1/auth/login')
//         .send(userMock.shortPassword)
//         .end((err, res) => {
//           expect(res).to.have.status(400);
//           expect(res.body.message).to.equals("Password should have a minimum length of 5 characters");
//           done();
//         });
//   });
// });

// describe("Phantom testing", () => {
//   it("Should return a welcome message", done => {
//     chai
//       .request(app)
//       .get("/")
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body.message).to.equals('Welcome to our phantom beginning');
//         done();
//         });
//     });
// });