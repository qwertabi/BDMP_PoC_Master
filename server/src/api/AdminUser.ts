// express
import { NextFunction, Response, Request, Router } from "express";

// model
import { AdminUser } from "../models/AdminUser";
import { AdminUserModel } from "../models/AdminUser";

/**
 * @class AdminUserApi
 */
export class AdminUserApi {

  /**
   * Create the api.
   * @static
   */
  public static create(router: Router) {
    // DELETE
    router.delete("/bdmpUser/:id([0-9a-f]{24})", (req: Request, res: Response, next: NextFunction) => {
      new AdminUserApi().delete(req, res, next);
    });

    // GET
    router.get("/bdmpUser", (req: Request, res: Response, next: NextFunction) => {
      new AdminUserApi().list(req, res, next);
    });
    router.get("/bdmpUser/:id([0-9a-f]{24})", (req: Request, res: Response, next: NextFunction) => {
      new AdminUserApi().get(req, res, next);
    });

    // POST
    router.post("/bdmpUser", (req: Request, res: Response, next: NextFunction) => {
      new AdminUserApi().create(req, res, next);
    });

    // PUT
    router.put("/bdmpUser/:id([0-9a-f]{24})", (req: Request, res: Response, next: NextFunction) => {
      new AdminUserApi().update(req, res, next);
    });
  }

  /**
   * Create a new BDMP User.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
  public create(req: Request, res: Response, next: NextFunction) {
    // create BDMP User
    const bdmpUser = new AdminUser(req.body);
    bdmpUser.save().then(bdmpUser => {
      res.json(bdmpUser.toObject());
      next();
    }).catch(next);
  }

  /**
   * Delete a BDMP User.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
  public delete(req: Request, res: Response, next: NextFunction) {
    // verify the id parameter exists
    const PARAM_ID: string = "id";
    if (req.params[PARAM_ID] === undefined) {
      res.sendStatus(404);
      next();
      return;
    }

    // get id
    const id: string = req.params[PARAM_ID];

      // get BDMP User
      AdminUser.findById(id).then(bdmpUser => {

      // verify bdmpUser exists
      if (bdmpUser === null) {
        res.sendStatus(404);
        next();
        return;
      }

      bdmpUser.remove().then(() => {
        res.sendStatus(200);
        next();
      }).catch(next);
    }).catch(next);
  }

  /**
   * Get a BDMP User.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
  public get(req: Request, res: Response, next: NextFunction) {
    // verify the id parameter exists
    const PARAM_ID: string = "id";
    if (req.params[PARAM_ID] === undefined) {
      res.sendStatus(404);
      next();
      return;
    }

    // get id
    const id: string = req.params[PARAM_ID];

    // get BDMP User
      AdminUser.findById(id).then(bdmpUser => {

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
  }

  /**
   * List all BDMP Users.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
  public list(req: Request, res: Response, next: NextFunction) {
    // get bdmpUser
    AdminUser.find().then(bdmpUser => {
      res.json(bdmpUser.map(bdmpUser => bdmpUser.toObject()));
      next();
    }).catch(next);
  }

  /**
   * Update a BDMP User.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
  public update(req: Request, res: Response, next: NextFunction) {
    const PARAM_ID: string = "id";

    // verify the id parameter exists
    if (req.params[PARAM_ID] === undefined) {
      res.sendStatus(404);
      next();
      return;
    }

    // get id
    const id: string = req.params[PARAM_ID];

    // get bdmpUser
    AdminUser.findById(id).then(bdmpUser => {

      // verify bdmpUser was found
      if (bdmpUser === null) {
        res.sendStatus(404);
        next();
        return;
      }

      // save bdmpUser
      Object.assign(bdmpUser, req.body).save().then((bdmpUser: AdminUserModel) => {
        res.json(bdmpUser.toObject());
        next();
      }).catch(next);
    }).catch(next);
  }

}
