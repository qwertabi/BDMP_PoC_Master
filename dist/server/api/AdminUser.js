"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// model
var AdminUser_1 = require("../models/AdminUser");
/**
 * @class AdminUserApi
 */
var AdminUserApi = /** @class */ (function () {
    function AdminUserApi() {
    }
    /**
     * Create the api.
     * @static
     */
    AdminUserApi.create = function (router) {
        // DELETE
        router.delete("/bdmpUser/:id([0-9a-f]{24})", function (req, res, next) {
            new AdminUserApi().delete(req, res, next);
        });
        // GET
        router.get("/bdmpUser", function (req, res, next) {
            new AdminUserApi().list(req, res, next);
        });
        router.get("/bdmpUser/:id([0-9a-f]{24})", function (req, res, next) {
            new AdminUserApi().get(req, res, next);
        });
        // POST
        router.post("/bdmpUser", function (req, res, next) {
            new AdminUserApi().create(req, res, next);
        });
        // PUT
        router.put("/bdmpUser/:id([0-9a-f]{24})", function (req, res, next) {
            new AdminUserApi().update(req, res, next);
        });
    };
    /**
     * Create a new BDMP User.
     * @param req {Request} The express request object.
     * @param res {Response} The express response object.
     * @param next {NextFunction} The next function to continue.
     */
    AdminUserApi.prototype.create = function (req, res, next) {
        // create BDMP User
        var bdmpUser = new AdminUser_1.AdminUser(req.body);
        bdmpUser.save().then(function (bdmpUser) {
            res.json(bdmpUser.toObject());
            next();
        }).catch(next);
    };
    /**
     * Delete a BDMP User.
     * @param req {Request} The express request object.
     * @param res {Response} The express response object.
     * @param next {NextFunction} The next function to continue.
     */
    AdminUserApi.prototype.delete = function (req, res, next) {
        // verify the id parameter exists
        var PARAM_ID = "id";
        if (req.params[PARAM_ID] === undefined) {
            res.sendStatus(404);
            next();
            return;
        }
        // get id
        var id = req.params[PARAM_ID];
        // get BDMP User
        AdminUser_1.AdminUser.findById(id).then(function (bdmpUser) {
            // verify bdmpUser exists
            if (bdmpUser === null) {
                res.sendStatus(404);
                next();
                return;
            }
            bdmpUser.remove().then(function () {
                res.sendStatus(200);
                next();
            }).catch(next);
        }).catch(next);
    };
    /**
     * Get a BDMP User.
     * @param req {Request} The express request object.
     * @param res {Response} The express response object.
     * @param next {NextFunction} The next function to continue.
     */
    AdminUserApi.prototype.get = function (req, res, next) {
        // verify the id parameter exists
        var PARAM_ID = "id";
        if (req.params[PARAM_ID] === undefined) {
            res.sendStatus(404);
            next();
            return;
        }
        // get id
        var id = req.params[PARAM_ID];
        // get BDMP User
        AdminUser_1.AdminUser.findById(id).then(function (bdmpUser) {
            // verify bdmpUser was found
            if (bdmpUser === null) {
                res.sendStatus(404);
                next();
                return;
            }
            // send json of bdmpUser object
            res.json(bdmpUser.toObject());
            next();
        }).catch(next);
    };
    /**
     * List all BDMP Users.
     * @param req {Request} The express request object.
     * @param res {Response} The express response object.
     * @param next {NextFunction} The next function to continue.
     */
    AdminUserApi.prototype.list = function (req, res, next) {
        // get bdmpUser
        AdminUser_1.AdminUser.find().then(function (bdmpUser) {
            res.json(bdmpUser.map(function (bdmpUser) { return bdmpUser.toObject(); }));
            next();
        }).catch(next);
    };
    /**
     * Update a BDMP User.
     * @param req {Request} The express request object.
     * @param res {Response} The express response object.
     * @param next {NextFunction} The next function to continue.
     */
    AdminUserApi.prototype.update = function (req, res, next) {
        var PARAM_ID = "id";
        // verify the id parameter exists
        if (req.params[PARAM_ID] === undefined) {
            res.sendStatus(404);
            next();
            return;
        }
        // get id
        var id = req.params[PARAM_ID];
        // get bdmpUser
        AdminUser_1.AdminUser.findById(id).then(function (bdmpUser) {
            // verify bdmpUser was found
            if (bdmpUser === null) {
                res.sendStatus(404);
                next();
                return;
            }
            // save bdmpUser
            Object.assign(bdmpUser, req.body).save().then(function (bdmpUser) {
                res.json(bdmpUser.toObject());
                next();
            }).catch(next);
        }).catch(next);
    };
    return AdminUserApi;
}());
exports.AdminUserApi = AdminUserApi;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LFFBQXdCO2dCQUNyRSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLEVBQUUsQ0FBQztZQUNULENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVILG1CQUFDO0FBQUQsQ0F0S0EsQUFzS0MsSUFBQTtBQXRLWSxvQ0FBWSIsImZpbGUiOiJhcGkvQWRtaW5Vc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXhwcmVzc1xuaW1wb3J0IHsgTmV4dEZ1bmN0aW9uLCBSZXNwb25zZSwgUmVxdWVzdCwgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcblxuLy8gbW9kZWxcbmltcG9ydCB7IEFkbWluVXNlciB9IGZyb20gXCIuLi9tb2RlbHMvQWRtaW5Vc2VyXCI7XG5pbXBvcnQgeyBBZG1pblVzZXJNb2RlbCB9IGZyb20gXCIuLi9tb2RlbHMvQWRtaW5Vc2VyXCI7XG5cbi8qKlxuICogQGNsYXNzIEFkbWluVXNlckFwaVxuICovXG5leHBvcnQgY2xhc3MgQWRtaW5Vc2VyQXBpIHtcblxuICAvKipcbiAgICogQ3JlYXRlIHRoZSBhcGkuXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHJvdXRlcjogUm91dGVyKSB7XG4gICAgLy8gREVMRVRFXG4gICAgcm91dGVyLmRlbGV0ZShcIi9iZG1wVXNlci86aWQoWzAtOWEtZl17MjR9KVwiLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgIG5ldyBBZG1pblVzZXJBcGkoKS5kZWxldGUocmVxLCByZXMsIG5leHQpO1xuICAgIH0pO1xuXG4gICAgLy8gR0VUXG4gICAgcm91dGVyLmdldChcIi9iZG1wVXNlclwiLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgIG5ldyBBZG1pblVzZXJBcGkoKS5saXN0KHJlcSwgcmVzLCBuZXh0KTtcbiAgICB9KTtcbiAgICByb3V0ZXIuZ2V0KFwiL2JkbXBVc2VyLzppZChbMC05YS1mXXsyNH0pXCIsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgICAgbmV3IEFkbWluVXNlckFwaSgpLmdldChyZXEsIHJlcywgbmV4dCk7XG4gICAgfSk7XG5cbiAgICAvLyBQT1NUXG4gICAgcm91dGVyLnBvc3QoXCIvYmRtcFVzZXJcIiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgICBuZXcgQWRtaW5Vc2VyQXBpKCkuY3JlYXRlKHJlcSwgcmVzLCBuZXh0KTtcbiAgICB9KTtcblxuICAgIC8vIFBVVFxuICAgIHJvdXRlci5wdXQoXCIvYmRtcFVzZXIvOmlkKFswLTlhLWZdezI0fSlcIiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgICBuZXcgQWRtaW5Vc2VyQXBpKCkudXBkYXRlKHJlcSwgcmVzLCBuZXh0KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgQkRNUCBVc2VyLlxuICAgKiBAcGFyYW0gcmVxIHtSZXF1ZXN0fSBUaGUgZXhwcmVzcyByZXF1ZXN0IG9iamVjdC5cbiAgICogQHBhcmFtIHJlcyB7UmVzcG9uc2V9IFRoZSBleHByZXNzIHJlc3BvbnNlIG9iamVjdC5cbiAgICogQHBhcmFtIG5leHQge05leHRGdW5jdGlvbn0gVGhlIG5leHQgZnVuY3Rpb24gdG8gY29udGludWUuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XG4gICAgLy8gY3JlYXRlIEJETVAgVXNlclxuICAgIGNvbnN0IGJkbXBVc2VyID0gbmV3IEFkbWluVXNlcihyZXEuYm9keSk7XG4gICAgYmRtcFVzZXIuc2F2ZSgpLnRoZW4oYmRtcFVzZXIgPT4ge1xuICAgICAgcmVzLmpzb24oYmRtcFVzZXIudG9PYmplY3QoKSk7XG4gICAgICBuZXh0KCk7XG4gICAgfSkuY2F0Y2gobmV4dCk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgQkRNUCBVc2VyLlxuICAgKiBAcGFyYW0gcmVxIHtSZXF1ZXN0fSBUaGUgZXhwcmVzcyByZXF1ZXN0IG9iamVjdC5cbiAgICogQHBhcmFtIHJlcyB7UmVzcG9uc2V9IFRoZSBleHByZXNzIHJlc3BvbnNlIG9iamVjdC5cbiAgICogQHBhcmFtIG5leHQge05leHRGdW5jdGlvbn0gVGhlIG5leHQgZnVuY3Rpb24gdG8gY29udGludWUuXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XG4gICAgLy8gdmVyaWZ5IHRoZSBpZCBwYXJhbWV0ZXIgZXhpc3RzXG4gICAgY29uc3QgUEFSQU1fSUQ6IHN0cmluZyA9IFwiaWRcIjtcbiAgICBpZiAocmVxLnBhcmFtc1tQQVJBTV9JRF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVzLnNlbmRTdGF0dXMoNDA0KTtcbiAgICAgIG5leHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBnZXQgaWRcbiAgICBjb25zdCBpZDogc3RyaW5nID0gcmVxLnBhcmFtc1tQQVJBTV9JRF07XG5cbiAgICAgIC8vIGdldCBCRE1QIFVzZXJcbiAgICAgIEFkbWluVXNlci5maW5kQnlJZChpZCkudGhlbihiZG1wVXNlciA9PiB7XG5cbiAgICAgIC8vIHZlcmlmeSBiZG1wVXNlciBleGlzdHNcbiAgICAgIGlmIChiZG1wVXNlciA9PT0gbnVsbCkge1xuICAgICAgICByZXMuc2VuZFN0YXR1cyg0MDQpO1xuICAgICAgICBuZXh0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYmRtcFVzZXIucmVtb3ZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHJlcy5zZW5kU3RhdHVzKDIwMCk7XG4gICAgICAgIG5leHQoKTtcbiAgICAgIH0pLmNhdGNoKG5leHQpO1xuICAgIH0pLmNhdGNoKG5leHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIEJETVAgVXNlci5cbiAgICogQHBhcmFtIHJlcSB7UmVxdWVzdH0gVGhlIGV4cHJlc3MgcmVxdWVzdCBvYmplY3QuXG4gICAqIEBwYXJhbSByZXMge1Jlc3BvbnNlfSBUaGUgZXhwcmVzcyByZXNwb25zZSBvYmplY3QuXG4gICAqIEBwYXJhbSBuZXh0IHtOZXh0RnVuY3Rpb259IFRoZSBuZXh0IGZ1bmN0aW9uIHRvIGNvbnRpbnVlLlxuICAgKi9cbiAgcHVibGljIGdldChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xuICAgIC8vIHZlcmlmeSB0aGUgaWQgcGFyYW1ldGVyIGV4aXN0c1xuICAgIGNvbnN0IFBBUkFNX0lEOiBzdHJpbmcgPSBcImlkXCI7XG4gICAgaWYgKHJlcS5wYXJhbXNbUEFSQU1fSURdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcy5zZW5kU3RhdHVzKDQwNCk7XG4gICAgICBuZXh0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZ2V0IGlkXG4gICAgY29uc3QgaWQ6IHN0cmluZyA9IHJlcS5wYXJhbXNbUEFSQU1fSURdO1xuXG4gICAgLy8gZ2V0IEJETVAgVXNlclxuICAgICAgQWRtaW5Vc2VyLmZpbmRCeUlkKGlkKS50aGVuKGJkbXBVc2VyID0+IHtcblxuICAgICAgLy8gdmVyaWZ5IGJkbXBVc2VyIHdhcyBmb3VuZFxuICAgICAgaWYgKGJkbXBVc2VyID09PSBudWxsKSB7XG4gICAgICAgIHJlcy5zZW5kU3RhdHVzKDQwNCk7XG4gICAgICAgIG5leHQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBzZW5kIGpzb24gb2YgYmRtcFVzZXIgb2JqZWN0XG4gICAgICByZXMuanNvbihiZG1wVXNlci50b09iamVjdCgpKTtcbiAgICAgIG5leHQoKTtcbiAgICB9KS5jYXRjaChuZXh0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0IGFsbCBCRE1QIFVzZXJzLlxuICAgKiBAcGFyYW0gcmVxIHtSZXF1ZXN0fSBUaGUgZXhwcmVzcyByZXF1ZXN0IG9iamVjdC5cbiAgICogQHBhcmFtIHJlcyB7UmVzcG9uc2V9IFRoZSBleHByZXNzIHJlc3BvbnNlIG9iamVjdC5cbiAgICogQHBhcmFtIG5leHQge05leHRGdW5jdGlvbn0gVGhlIG5leHQgZnVuY3Rpb24gdG8gY29udGludWUuXG4gICAqL1xuICBwdWJsaWMgbGlzdChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xuICAgIC8vIGdldCBiZG1wVXNlclxuICAgIEFkbWluVXNlci5maW5kKCkudGhlbihiZG1wVXNlciA9PiB7XG4gICAgICByZXMuanNvbihiZG1wVXNlci5tYXAoYmRtcFVzZXIgPT4gYmRtcFVzZXIudG9PYmplY3QoKSkpO1xuICAgICAgbmV4dCgpO1xuICAgIH0pLmNhdGNoKG5leHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhIEJETVAgVXNlci5cbiAgICogQHBhcmFtIHJlcSB7UmVxdWVzdH0gVGhlIGV4cHJlc3MgcmVxdWVzdCBvYmplY3QuXG4gICAqIEBwYXJhbSByZXMge1Jlc3BvbnNlfSBUaGUgZXhwcmVzcyByZXNwb25zZSBvYmplY3QuXG4gICAqIEBwYXJhbSBuZXh0IHtOZXh0RnVuY3Rpb259IFRoZSBuZXh0IGZ1bmN0aW9uIHRvIGNvbnRpbnVlLlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xuICAgIGNvbnN0IFBBUkFNX0lEOiBzdHJpbmcgPSBcImlkXCI7XG5cbiAgICAvLyB2ZXJpZnkgdGhlIGlkIHBhcmFtZXRlciBleGlzdHNcbiAgICBpZiAocmVxLnBhcmFtc1tQQVJBTV9JRF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVzLnNlbmRTdGF0dXMoNDA0KTtcbiAgICAgIG5leHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBnZXQgaWRcbiAgICBjb25zdCBpZDogc3RyaW5nID0gcmVxLnBhcmFtc1tQQVJBTV9JRF07XG5cbiAgICAvLyBnZXQgYmRtcFVzZXJcbiAgICBBZG1pblVzZXIuZmluZEJ5SWQoaWQpLnRoZW4oYmRtcFVzZXIgPT4ge1xuXG4gICAgICAvLyB2ZXJpZnkgYmRtcFVzZXIgd2FzIGZvdW5kXG4gICAgICBpZiAoYmRtcFVzZXIgPT09IG51bGwpIHtcbiAgICAgICAgcmVzLnNlbmRTdGF0dXMoNDA0KTtcbiAgICAgICAgbmV4dCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIHNhdmUgYmRtcFVzZXJcbiAgICAgIE9iamVjdC5hc3NpZ24oYmRtcFVzZXIsIHJlcS5ib2R5KS5zYXZlKCkudGhlbigoYmRtcFVzZXI6IEFkbWluVXNlck1vZGVsKSA9PiB7XG4gICAgICAgIHJlcy5qc29uKGJkbXBVc2VyLnRvT2JqZWN0KCkpO1xuICAgICAgICBuZXh0KCk7XG4gICAgICB9KS5jYXRjaChuZXh0KTtcbiAgICB9KS5jYXRjaChuZXh0KTtcbiAgfVxuXG59XG4iXX0=
