"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = "test";
// mocha
require("mocha");
var mocha_typescript_1 = require("mocha-typescript");
// server
var server_1 = require("../server");
var AdminUser_1 = require("../schemas/AdminUser");
// mongoose
var mongoose = require("mongoose");
//require http server
var http = require("http");
//require chai and use should assertions
var chai = require("chai");
chai.should();
//configure chai-http
chai.use(require("chai-http"));
var AdminUserTest = /** @class */ (function () {
    function AdminUserTest() {
    }
    AdminUserTest_1 = AdminUserTest;
    /**
     * Before all hook.
     */
    AdminUserTest.before = function () {
        // connect to MongoDB
        mongoose.connect("mongodb://localhost:27017/bdmp-poc-master");
        AdminUserTest_1.AdminUser = mongoose.model("AdminUser", AdminUser_1.adminUserSchema);
        // create http server
        var port = 8001;
        var app = server_1.Server.bootstrap().app;
        app.set("port", port);
        AdminUserTest_1.server = http.createServer(app);
        AdminUserTest_1.server.listen(port);
        return AdminUserTest_1.createAdminUser();
    };
    /**
     * After all hook
     */
    AdminUserTest.after = function () {
        return AdminUserTest_1.adminUser.remove()
            .then(function () {
            return mongoose.disconnect();
        });
    };
    /**
     * Create a test admin user.
     */
    AdminUserTest.createAdminUser = function () {
        var data = {
            name: "Kevin Kennedy",
            userName: "kevin.kennedy@gmail.com",
            password: "randomPassword"
        };
        return new AdminUserTest_1.AdminUser(data).save().then(function (adminUser) {
            AdminUserTest_1.adminUser = adminUser;
            return adminUser;
        });
    };
    AdminUserTest.prototype.list = function () {
        return chai.request(AdminUserTest_1.server).get(AdminUserTest_1.BASE_URI).then(function (response) {
            response.should.have.status(200);
            response.body.should.be.an("array");
            response.body.should.have.lengthOf(2);
        });
    };
    AdminUserTest.prototype.delete = function () {
        var data = {
            name: "To be deleted"
        };
        return new AdminUserTest_1.AdminUser(data).save().then(function (adminUser) {
            return chai.request(AdminUserTest_1.server).del(AdminUserTest_1.BASE_URI + "/" + adminUser._id).then(function (response) {
                response.should.have.status(200);
            });
        });
    };
    AdminUserTest.prototype.get = function () {
        return chai.request(AdminUserTest_1.server).get(AdminUserTest_1.BASE_URI + "/" + AdminUserTest_1.adminUser._id).then(function (response) {
            response.should.have.status(200);
            response.body.should.be.a("object");
            response.body.should.have.property("name").eql(AdminUserTest_1.adminUser.name);
        });
    };
    AdminUserTest.prototype.post = function () {
        var data = {
            name: "Magneto",
            userName: "Magneto.kennedy@gmail.com",
            password: "randomPassword"
        };
        return chai.request(AdminUserTest_1.server).post(AdminUserTest_1.BASE_URI)
            .send(data)
            .then(function (response) {
            response.should.have.status(200);
            response.body.should.be.a("object");
            response.body.should.have.a.property("_id");
            response.body.should.have.property("name").eql(data.name);
            return AdminUserTest_1.AdminUser.findByIdAndRemove(response.body._id).exec();
        });
    };
    AdminUserTest.prototype.put = function () {
        var data = {
            name: "Superman",
            userName: "Superman.kennedy@gmail.com",
            password: "randomPassword"
        };
        return chai.request(AdminUserTest_1.server).put(AdminUserTest_1.BASE_URI + "/" + AdminUserTest_1.adminUser._id)
            .send(data)
            .then(function (response) {
            response.should.have.status(200);
            response.body.should.be.a("object");
            response.body.should.have.a.property("_id");
            response.body.should.have.property("name").eql(data.name);
        });
    };
    var AdminUserTest_1;
    // constants
    AdminUserTest.BASE_URI = "/api/bdmpUser";
    __decorate([
        mocha_typescript_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AdminUserTest.prototype, "list", null);
    __decorate([
        mocha_typescript_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AdminUserTest.prototype, "delete", null);
    __decorate([
        mocha_typescript_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AdminUserTest.prototype, "get", null);
    __decorate([
        mocha_typescript_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AdminUserTest.prototype, "post", null);
    __decorate([
        mocha_typescript_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AdminUserTest.prototype, "put", null);
    AdminUserTest = AdminUserTest_1 = __decorate([
        mocha_typescript_1.suite
    ], AdminUserTest);
    return AdminUserTest;
}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFDLENBQUM7WUFDakMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztJQXBIRCxZQUFZO0lBQ0Usc0JBQVEsR0FBVyxlQUFlLENBQUM7SUF5RDNDO1FBQUwsdUJBQUk7Ozs7NkNBTUo7SUFFSztRQUFMLHVCQUFJOzs7OytDQVNKO0lBRUs7UUFBTCx1QkFBSTs7Ozs0Q0FNSjtJQUVLO1FBQUwsdUJBQUk7Ozs7NkNBZUo7SUFFSztRQUFMLHVCQUFJOzs7OzRDQWNKO0lBdEhVLGFBQWE7UUFBekIsd0JBQUs7T0FBTyxhQUFhLENBeUh6QjtJQUFELG9CQUFDO0NBekhNLEFBeUhOLElBQUEiLCJmaWxlIjoidGVzdHMvQWRtaW5Vc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsicHJvY2Vzcy5lbnYuTk9ERV9FTlYgPSBcInRlc3RcIjtcblxuLy8gbW9jaGFcbmltcG9ydCBcIm1vY2hhXCI7XG5pbXBvcnQgeyBzdWl0ZSwgdGVzdCB9IGZyb20gXCJtb2NoYS10eXBlc2NyaXB0XCI7XG5cbi8vIG1vbmdvZGJcbmltcG9ydCB7IE9iamVjdElEIH0gZnJvbSBcIm1vbmdvZGJcIjtcblxuLy8gc2VydmVyXG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tIFwiLi4vc2VydmVyXCI7XG5cbi8vIG1vZGVsXG5pbXBvcnQgeyBBZG1pblVzZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9BZG1pblVzZXJcIjtcbmltcG9ydCB7IEFkbWluVXNlck1vZGVsLCBBZG1pblVzZXJNb2RlbFN0YXRpYyB9IGZyb20gXCIuLi9tb2RlbHMvQWRtaW5Vc2VyXCI7XG5pbXBvcnQgeyBhZG1pblVzZXJTY2hlbWEgfSBmcm9tIFwiLi4vc2NoZW1hcy9BZG1pblVzZXJcIjtcblxuLy8gbW9uZ29vc2VcbmltcG9ydCBtb25nb29zZSA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTtcblxuLy9yZXF1aXJlIGh0dHAgc2VydmVyXG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xuXG4vL3JlcXVpcmUgY2hhaSBhbmQgdXNlIHNob3VsZCBhc3NlcnRpb25zXG5sZXQgY2hhaSA9IHJlcXVpcmUoXCJjaGFpXCIpO1xuY2hhaS5zaG91bGQoKTtcblxuLy9jb25maWd1cmUgY2hhaS1odHRwXG5jaGFpLnVzZShyZXF1aXJlKFwiY2hhaS1odHRwXCIpKTtcblxuQHN1aXRlIGNsYXNzIEFkbWluVXNlclRlc3Qge1xuXG4gIC8vIGNvbnN0YW50c1xuICBwdWJsaWMgc3RhdGljIEJBU0VfVVJJOiBzdHJpbmcgPSBcIi9hcGkvYmRtcFVzZXJcIjtcblxuICAvLyB0aGUgbW9uZ29vb3NlIGNvbm5lY3Rpb25cbiAgcHVibGljIHN0YXRpYyBjb25uZWN0aW9uOiBtb25nb29zZS5Db25uZWN0aW9uO1xuXG4gIC8vIEJETVAgQWRtaW5Vc2VyIG1vZGVsXG4gIHB1YmxpYyBzdGF0aWMgQWRtaW5Vc2VyOiBBZG1pblVzZXJNb2RlbFN0YXRpYztcblxuICAvLyBhZG1pbnVzZXIgZG9jdW1lbnRcbiAgcHVibGljIHN0YXRpYyBhZG1pblVzZXI6IEFkbWluVXNlck1vZGVsO1xuXG4gIC8vIHRoZSBodHRwIHNlcnZlclxuICBwdWJsaWMgc3RhdGljIHNlcnZlcjogYW55O1xuXG4gIC8qKlxuICAgKiBCZWZvcmUgYWxsIGhvb2suXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGJlZm9yZSgpIHtcbiAgICAgLy8gY29ubmVjdCB0byBNb25nb0RCXG4gICAgbW9uZ29vc2UuY29ubmVjdChcIm1vbmdvZGI6Ly9sb2NhbGhvc3Q6MjcwMTcvYmRtcC1wb2MtbWFzdGVyXCIpO1xuICAgIEFkbWluVXNlclRlc3QuQWRtaW5Vc2VyID0gbW9uZ29vc2UubW9kZWw8QWRtaW5Vc2VyTW9kZWwsIEFkbWluVXNlck1vZGVsU3RhdGljPihcIkFkbWluVXNlclwiLCBhZG1pblVzZXJTY2hlbWEpO1xuXG4gICAgLy8gY3JlYXRlIGh0dHAgc2VydmVyXG4gICAgbGV0IHBvcnQgPSA4MDAxO1xuICAgIGxldCBhcHAgPSBTZXJ2ZXIuYm9vdHN0cmFwKCkuYXBwO1xuICAgIGFwcC5zZXQoXCJwb3J0XCIsIHBvcnQpO1xuICAgIEFkbWluVXNlclRlc3Quc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwKTtcbiAgICBBZG1pblVzZXJUZXN0LnNlcnZlci5saXN0ZW4ocG9ydCk7XG5cbiAgICByZXR1cm4gQWRtaW5Vc2VyVGVzdC5jcmVhdGVBZG1pblVzZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciBhbGwgaG9va1xuICAgKi9cbiAgcHVibGljIHN0YXRpYyBhZnRlcigpIHtcbiAgICByZXR1cm4gQWRtaW5Vc2VyVGVzdC5hZG1pblVzZXIucmVtb3ZlKClcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gbW9uZ29vc2UuZGlzY29ubmVjdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIHRlc3QgYWRtaW4gdXNlci5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlQWRtaW5Vc2VyKCk6IFByb21pc2U8QWRtaW5Vc2VyTW9kZWw+IHtcbiAgICBjb25zdCBkYXRhOiBBZG1pblVzZXIgPSB7XG4gICAgICBuYW1lOiBcIktldmluIEtlbm5lZHlcIixcbiAgICAgIHVzZXJOYW1lOiBcImtldmluLmtlbm5lZHlAZ21haWwuY29tXCIsXG4gICAgICBwYXNzd29yZDogXCJyYW5kb21QYXNzd29yZFwiXG4gICAgfTtcbiAgICByZXR1cm4gbmV3IEFkbWluVXNlclRlc3QuQWRtaW5Vc2VyKGRhdGEpLnNhdmUoKS50aGVuKGFkbWluVXNlciA9PiB7XG4gICAgICBBZG1pblVzZXJUZXN0LmFkbWluVXNlciA9IGFkbWluVXNlcjtcbiAgICAgIHJldHVybiBhZG1pblVzZXI7XG4gICAgfSk7XG4gIH1cblxuICBAdGVzdCBwdWJsaWMgbGlzdCgpIHtcbiAgICByZXR1cm4gY2hhaS5yZXF1ZXN0KEFkbWluVXNlclRlc3Quc2VydmVyKS5nZXQoQWRtaW5Vc2VyVGVzdC5CQVNFX1VSSSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXNwb25zZS5zaG91bGQuaGF2ZS5zdGF0dXMoMjAwKTtcbiAgICAgIHJlc3BvbnNlLmJvZHkuc2hvdWxkLmJlLmFuKFwiYXJyYXlcIik7XG4gICAgICByZXNwb25zZS5ib2R5LnNob3VsZC5oYXZlLmxlbmd0aE9mKDIpO1xuICAgIH0pO1xuICB9XG5cbiAgQHRlc3QgcHVibGljIGRlbGV0ZSgpIHtcbiAgICBjb25zdCBkYXRhOiBBZG1pblVzZXIgPSB7XG4gICAgICBuYW1lOiBcIlRvIGJlIGRlbGV0ZWRcIlxuICAgIH07XG4gICAgcmV0dXJuIG5ldyBBZG1pblVzZXJUZXN0LkFkbWluVXNlcihkYXRhKS5zYXZlKCkudGhlbihhZG1pblVzZXIgPT4ge1xuICAgICAgcmV0dXJuIGNoYWkucmVxdWVzdChBZG1pblVzZXJUZXN0LnNlcnZlcikuZGVsKGAke0FkbWluVXNlclRlc3QuQkFTRV9VUkl9LyR7YWRtaW5Vc2VyLl9pZH1gKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgcmVzcG9uc2Uuc2hvdWxkLmhhdmUuc3RhdHVzKDIwMCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIEB0ZXN0IHB1YmxpYyBnZXQoKSB7XG4gICAgcmV0dXJuIGNoYWkucmVxdWVzdChBZG1pblVzZXJUZXN0LnNlcnZlcikuZ2V0KGAke0FkbWluVXNlclRlc3QuQkFTRV9VUkl9LyR7QWRtaW5Vc2VyVGVzdC5hZG1pblVzZXIuX2lkfWApLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmVzcG9uc2Uuc2hvdWxkLmhhdmUuc3RhdHVzKDIwMCk7XG4gICAgICByZXNwb25zZS5ib2R5LnNob3VsZC5iZS5hKFwib2JqZWN0XCIpO1xuICAgICAgcmVzcG9uc2UuYm9keS5zaG91bGQuaGF2ZS5wcm9wZXJ0eShcIm5hbWVcIikuZXFsKEFkbWluVXNlclRlc3QuYWRtaW5Vc2VyLm5hbWUpO1xuICAgIH0pO1xuICB9XG5cbiAgQHRlc3QgcHVibGljIHBvc3QoKSB7XG4gICAgY29uc3QgZGF0YTogQWRtaW5Vc2VyID0ge1xuICAgICAgbmFtZTogXCJNYWduZXRvXCIsXG4gICAgICB1c2VyTmFtZTogXCJNYWduZXRvLmtlbm5lZHlAZ21haWwuY29tXCIsXG4gICAgICBwYXNzd29yZDogXCJyYW5kb21QYXNzd29yZFwiXG4gICAgfTtcbiAgICByZXR1cm4gY2hhaS5yZXF1ZXN0KEFkbWluVXNlclRlc3Quc2VydmVyKS5wb3N0KEFkbWluVXNlclRlc3QuQkFTRV9VUkkpXG4gICAgLnNlbmQoZGF0YSlcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXNwb25zZS5zaG91bGQuaGF2ZS5zdGF0dXMoMjAwKTtcbiAgICAgIHJlc3BvbnNlLmJvZHkuc2hvdWxkLmJlLmEoXCJvYmplY3RcIik7XG4gICAgICByZXNwb25zZS5ib2R5LnNob3VsZC5oYXZlLmEucHJvcGVydHkoXCJfaWRcIik7XG4gICAgICByZXNwb25zZS5ib2R5LnNob3VsZC5oYXZlLnByb3BlcnR5KFwibmFtZVwiKS5lcWwoZGF0YS5uYW1lKTtcbiAgICAgIHJldHVybiBBZG1pblVzZXJUZXN0LkFkbWluVXNlci5maW5kQnlJZEFuZFJlbW92ZShyZXNwb25zZS5ib2R5Ll9pZCkuZXhlYygpO1xuICAgIH0pO1xuICB9XG5cbiAgQHRlc3QgcHVibGljIHB1dCgpIHtcbiAgICBjb25zdCBkYXRhOiBBZG1pblVzZXIgPSB7XG4gICAgICBuYW1lOiBcIlN1cGVybWFuXCIsXG4gICAgICB1c2VyTmFtZTogXCJTdXBlcm1hbi5rZW5uZWR5QGdtYWlsLmNvbVwiLFxuICAgICAgcGFzc3dvcmQ6IFwicmFuZG9tUGFzc3dvcmRcIlxuICAgIH1cbiAgICByZXR1cm4gY2hhaS5yZXF1ZXN0KEFkbWluVXNlclRlc3Quc2VydmVyKS5wdXQoYCR7QWRtaW5Vc2VyVGVzdC5CQVNFX1VSSX0vJHtBZG1pblVzZXJUZXN0LmFkbWluVXNlci5faWR9YClcbiAgICAuc2VuZChkYXRhKVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHJlc3BvbnNlLnNob3VsZC5oYXZlLnN0YXR1cygyMDApO1xuICAgICAgcmVzcG9uc2UuYm9keS5zaG91bGQuYmUuYShcIm9iamVjdFwiKTtcbiAgICAgIHJlc3BvbnNlLmJvZHkuc2hvdWxkLmhhdmUuYS5wcm9wZXJ0eShcIl9pZFwiKTtcbiAgICAgIHJlc3BvbnNlLmJvZHkuc2hvdWxkLmhhdmUucHJvcGVydHkoXCJuYW1lXCIpLmVxbChkYXRhLm5hbWUpO1xuICAgIH0pO1xuICB9XG5cblxufSJdfQ==
