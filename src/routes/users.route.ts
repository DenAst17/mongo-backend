import { response, Router } from "express";
import UserController from "../controllers/users.controller"
import bodyParser from "body-parser";

function usersRoute() {
    const jsonParser = bodyParser.json()
    const router = Router();
    const userController = new UserController();
    router.get('/api/users', jsonParser, userController.getAll);
    router.get('/api/users/:id', jsonParser, userController.getOne);
    router.post('/api/users', jsonParser, userController.createOne);
    router.delete('/api/users/:id', jsonParser, userController.deleteOne);
    router.patch('/api/users/:id', jsonParser, userController.updateOne);
    return router;
}

export default usersRoute;