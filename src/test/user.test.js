import chai from "chai";
import chaiHttp from "chai-http";
// import dotenv from "dotenv";
import app from "../app";

chai.should();
chai.use(chaiHttp);

describe("Post Route for api/v1/auth/signup", () => {
  it("should create a new user", done => {
    const user = {
      email: "tricail@gmail.com",
      first_name: "Test",
      last_name: "email",
      password: "whateverhappens"
    };
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(user)
      .end((err, res) => {
        res.body.should.be.a("object");
        res.body.dataMessage.should.have.property("user_id");
        res.body.dataMessage.should.have.property("first_name");
        res.body.dataMessage.should.have.property("last_name");
        res.body.dataMessage.should.have.property("email");
        res.body.dataMessage.should.have.property("password");
        res.body.dataMessage.should.have.property("is_admin");
        done();
      });
  });
});
