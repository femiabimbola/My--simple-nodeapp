import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

chai.should();
chai.use(chaiHttp);

describe("Post Route for api/v1/auth/signup", () => {
  it("should create a new user", done => {
    const user = {
      email: "testforemail@gmail.com",
      first_name: "Test",
      last_name: "email",
      password: "whateverhappens"
    };
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.data.should.have.property("user.id");
        res.body.data.should.have.property("firstName");
        res.body.data.should.have.property("lastName");
        res.body.data.should.have.property("password");
        res.body.data.should.have.property("isAdmin");
        done();
      });
  });

  it();
});
