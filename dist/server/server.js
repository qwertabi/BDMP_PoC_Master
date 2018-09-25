"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
var morgan = require("morgan");
var errorHandler = require("errorhandler");
var mongoose = require("mongoose");
var cors = require("cors");
var AdminUser_1 = require("./api/AdminUser");
/**
 * The server.
 *
 * @class Server
 */
var Server = /** @class */ (function () {
    /**
     * @constructor
     */
    function Server() {
        //create expressjs application
        this.app = express();
        //configure application
        this.config();
        //add api
        this.api();
    }
    /**
     * Bootstrap the application.
     * @static
     */
    Server.bootstrap = function () {
        return new Server();
    };
    /**
     * Create REST API routes
     *
     * @class Server
     */
    /**
     * Configure application
     *
     * @class Server
     */
    Server.prototype.config = function () {
        // morgan middleware to log HTTP requests
        this.app.use(morgan("dev"));
        //use json form parser middlware
        this.app.use(bodyParser.json());
        //use query string parser middlware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        // connect to mongoose
        mongoose.connect("mongodb://localhost:27017/bdmp-poc-master");
        mongoose.connection.on("error", function (error) {
            console.error(error);
        });
        //catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        //error handling
        this.app.use(errorHandler());
    };
    /**
     * REST API endpoints.
     */
    Server.prototype.api = function () {
        var router = express.Router();
        // configure CORS
        var corsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: "http://localhost:4200",
            preflightContinue: false
        };
        router.use(cors(corsOptions));
        // root request
        router.get("/", function (req, res, next) {
            res.json({ announcement: "Welcome to our API." });
            next();
        });
        // create API routes
        AdminUser_1.AdminUserApi.create(router);
        // wire up the REST API
        this.app.use("/api", router);
        // enable CORS pre-flight
        router.options("*", cors(corsOptions));
    };
    return Server;
}());
exports.Server = Server;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LHlCQUF5QjtRQUN6QixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUgsYUFBQztBQUFELENBckdBLEFBcUdDLElBQUE7QUFyR1ksd0JBQU0iLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tIFwiYm9keS1wYXJzZXJcIjtcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCAqIGFzIG1vcmdhbiBmcm9tIFwibW9yZ2FuXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgZXJyb3JIYW5kbGVyID0gcmVxdWlyZShcImVycm9yaGFuZGxlclwiKTtcbmltcG9ydCBtb25nb29zZSA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTtcbmltcG9ydCAqIGFzIGNvcnMgZnJvbSBcImNvcnNcIjtcbmltcG9ydCB7IEFkbWluVXNlckFwaSB9IGZyb20gXCIuL2FwaS9BZG1pblVzZXJcIjtcblxuLyoqXG4gKiBUaGUgc2VydmVyLlxuICpcbiAqIEBjbGFzcyBTZXJ2ZXJcbiAqL1xuXG5leHBvcnQgY2xhc3MgU2VydmVyIHtcblxuICAvKipcbiAgICogVGhlIGV4cHJlc3MgYXBwbGljYXRpb24uXG4gICAqIEB0eXBlIHtBcHBsaWNhdGlvbn1cbiAgICovXG4gIHB1YmxpYyBhcHA6IGV4cHJlc3MuQXBwbGljYXRpb247XG5cbiAgLyoqXG4gICAqIEJvb3RzdHJhcCB0aGUgYXBwbGljYXRpb24uXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgYm9vdHN0cmFwKCk6IFNlcnZlciB7XG4gICAgcmV0dXJuIG5ldyBTZXJ2ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vY3JlYXRlIGV4cHJlc3NqcyBhcHBsaWNhdGlvblxuICAgIHRoaXMuYXBwID0gZXhwcmVzcygpO1xuXG4gICAgLy9jb25maWd1cmUgYXBwbGljYXRpb25cbiAgICB0aGlzLmNvbmZpZygpO1xuXG4gICAgLy9hZGQgYXBpXG4gICAgdGhpcy5hcGkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgUkVTVCBBUEkgcm91dGVzXG4gICAqXG4gICAqIEBjbGFzcyBTZXJ2ZXJcbiAgICovXG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyZSBhcHBsaWNhdGlvblxuICAgKlxuICAgKiBAY2xhc3MgU2VydmVyXG4gICAqL1xuICBwdWJsaWMgY29uZmlnKCkge1xuICAgIC8vIG1vcmdhbiBtaWRkbGV3YXJlIHRvIGxvZyBIVFRQIHJlcXVlc3RzXG4gICAgdGhpcy5hcHAudXNlKG1vcmdhbihcImRldlwiKSk7XG5cbiAgICAvL3VzZSBqc29uIGZvcm0gcGFyc2VyIG1pZGRsd2FyZVxuICAgIHRoaXMuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5cbiAgICAvL3VzZSBxdWVyeSBzdHJpbmcgcGFyc2VyIG1pZGRsd2FyZVxuICAgIHRoaXMuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoe1xuICAgICAgZXh0ZW5kZWQ6IHRydWVcbiAgICB9KSk7XG5cbiAgICAvLyBjb25uZWN0IHRvIG1vbmdvb3NlXG4gICAgbW9uZ29vc2UuY29ubmVjdChcIm1vbmdvZGI6Ly9sb2NhbGhvc3Q6MjcwMTcvYmRtcC1wb2MtbWFzdGVyXCIpO1xuICAgIG1vbmdvb3NlLmNvbm5lY3Rpb24ub24oXCJlcnJvclwiLCBlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9KTtcblxuICAgIC8vY2F0Y2ggNDA0IGFuZCBmb3J3YXJkIHRvIGVycm9yIGhhbmRsZXJcbiAgICB0aGlzLmFwcC51c2UoZnVuY3Rpb24oZXJyOiBhbnksIHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSB7XG4gICAgICAgIGVyci5zdGF0dXMgPSA0MDQ7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICB9KTtcblxuICAgIC8vZXJyb3IgaGFuZGxpbmdcbiAgICB0aGlzLmFwcC51c2UoZXJyb3JIYW5kbGVyKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJFU1QgQVBJIGVuZHBvaW50cy5cbiAgICovXG4gIHB1YmxpYyBhcGkoKSB7XG4gICAgdmFyIHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cbiAgICAvLyBjb25maWd1cmUgQ09SU1xuICAgIGNvbnN0IGNvcnNPcHRpb25zOiBjb3JzLkNvcnNPcHRpb25zID0ge1xuICAgICAgYWxsb3dlZEhlYWRlcnM6IFtcIk9yaWdpblwiLCBcIlgtUmVxdWVzdGVkLVdpdGhcIiwgXCJDb250ZW50LVR5cGVcIiwgXCJBY2NlcHRcIiwgXCJYLUFjY2Vzcy1Ub2tlblwiXSxcbiAgICAgIGNyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgbWV0aG9kczogXCJHRVQsSEVBRCxPUFRJT05TLFBVVCxQQVRDSCxQT1NULERFTEVURVwiLFxuICAgICAgb3JpZ2luOiBcImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMFwiLFxuICAgICAgcHJlZmxpZ2h0Q29udGludWU6IGZhbHNlXG4gICAgfTtcbiAgICByb3V0ZXIudXNlKGNvcnMoY29yc09wdGlvbnMpKTtcblxuICAgIC8vIHJvb3QgcmVxdWVzdFxuICAgIHJvdXRlci5nZXQoXCIvXCIsIChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikgPT4ge1xuICAgICAgcmVzLmpzb24oeyBhbm5vdW5jZW1lbnQ6IFwiV2VsY29tZSB0byBvdXIgQVBJLlwiIH0pO1xuICAgICAgbmV4dCgpO1xuICAgIH0pO1xuXG4gICAgLy8gY3JlYXRlIEFQSSByb3V0ZXNcbiAgICBBZG1pblVzZXJBcGkuY3JlYXRlKHJvdXRlcik7XG5cbiAgICAvLyB3aXJlIHVwIHRoZSBSRVNUIEFQSVxuICAgIHRoaXMuYXBwLnVzZShcIi9hcGlcIiwgcm91dGVyKTtcblxuICAgIC8vIGVuYWJsZSBDT1JTIHByZS1mbGlnaHRcbiAgICByb3V0ZXIub3B0aW9ucyhcIipcIiwgY29ycyhjb3JzT3B0aW9ucykpO1xuICB9XG5cbn1cbiJdfQ==
