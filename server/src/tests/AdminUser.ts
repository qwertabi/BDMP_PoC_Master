process.env.NODE_ENV = "test";

// mocha
import "mocha";
import { suite, test } from "mocha-typescript";

// mongodb
import { ObjectID } from "mongodb";

// server
import { Server } from "../server";

// model
import { AdminUser } from "../interfaces/AdminUser";
import { AdminUserModel, AdminUserModelStatic } from "../models/AdminUser";
import { adminUserSchema } from "../schemas/AdminUser";

// mongoose
import mongoose = require("mongoose");

//require http server
var http = require("http");

//require chai and use should assertions
let chai = require("chai");
chai.should();

//configure chai-http
chai.use(require("chai-http"));

@suite class AdminUserTest {

  // constants
  public static BASE_URI: string = "/api/bdmpUser";

  // the mongooose connection
  public static connection: mongoose.Connection;

  // BDMP AdminUser model
  public static AdminUser: AdminUserModelStatic;

  // adminuser document
  public static adminUser: AdminUserModel;

  // the http server
  public static server: any;

  /**
   * Before all hook.
   */
  public static before() {
     // connect to MongoDB
    mongoose.connect("mongodb://localhost:27017/bdmp-poc-master");
    AdminUserTest.AdminUser = mongoose.model<AdminUserModel, AdminUserModelStatic>("AdminUser", adminUserSchema);

    // create http server
    let port = 8001;
    let app = Server.bootstrap().app;
    app.set("port", port);
    AdminUserTest.server = http.createServer(app);
    AdminUserTest.server.listen(port);

    return AdminUserTest.createAdminUser();
  }

  /**
   * After all hook
   */
  public static after() {
    return AdminUserTest.adminUser.remove()
    .then(() => {
      return mongoose.disconnect();
    });
  }

  /**
   * Create a test admin user.
   */
  public static createAdminUser(): Promise<AdminUserModel> {
    const data: AdminUser = {
      name: "Kevin Kennedy",
      userName: "kevin.kennedy@gmail.com",
      password: "randomPassword"
    };
    return new AdminUserTest.AdminUser(data).save().then(adminUser => {
      AdminUserTest.adminUser = adminUser;
      return adminUser;
    });
  }

  @test public list() {
    return chai.request(AdminUserTest.server).get(AdminUserTest.BASE_URI).then(response => {
      response.should.have.status(200);
      response.body.should.be.an("array");
      response.body.should.have.lengthOf(2);
    });
  }

  @test public delete() {
    const data: AdminUser = {
      name: "To be deleted"
    };
    return new AdminUserTest.AdminUser(data).save().then(adminUser => {
      return chai.request(AdminUserTest.server).del(`${AdminUserTest.BASE_URI}/${adminUser._id}`).then(response => {
        response.should.have.status(200);
      });
    });
  }

  @test public get() {
    return chai.request(AdminUserTest.server).get(`${AdminUserTest.BASE_URI}/${AdminUserTest.adminUser._id}`).then(response => {
      response.should.have.status(200);
      response.body.should.be.a("object");
      response.body.should.have.property("name").eql(AdminUserTest.adminUser.name);
    });
  }

  @test public post() {
    const data: AdminUser = {
      name: "Magneto",
      userName: "Magneto.kennedy@gmail.com",
      password: "randomPassword"
    };
    return chai.request(AdminUserTest.server).post(AdminUserTest.BASE_URI)
    .send(data)
    .then(response => {
      response.should.have.status(200);
      response.body.should.be.a("object");
      response.body.should.have.a.property("_id");
      response.body.should.have.property("name").eql(data.name);
      return AdminUserTest.AdminUser.findByIdAndRemove(response.body._id).exec();
    });
  }

  @test public put() {
    const data: AdminUser = {
      name: "Superman",
      userName: "Superman.kennedy@gmail.com",
      password: "randomPassword"
    }
    return chai.request(AdminUserTest.server).put(`${AdminUserTest.BASE_URI}/${AdminUserTest.adminUser._id}`)
    .send(data)
    .then(response => {
      response.should.have.status(200);
      response.body.should.be.a("object");
      response.body.should.have.a.property("_id");
      response.body.should.have.property("name").eql(data.name);
    });
  }


}