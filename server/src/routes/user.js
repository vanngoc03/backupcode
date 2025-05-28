import express from "express";
import verifyToken from "../middlewares/verifyToken";
import * as userController from "../controllers/user";

const router = express.Router();

router.use(verifyToken);
router.get("/get-current", userController.getCurrent);
router.put("/", userController.updateUser);
router.get("/get-all-user", userController.getAllUsersController);
router.get("/admin/:id", userController.getUserById);
router.delete("/delete/:id", userController.deleteUserById);
router.put("/admin-update/:id", userController.updateUserByAdmin);

export default router;
