import express from "express";
import { deleteUser, test, updateUser , getUserListing, getUser , createFeedback, getFeedback} from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";


const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listing/:id', verifyToken , getUserListing);
router.get('/contact/:id', verifyToken, getUser);
router.post('/feedback/:id', verifyToken , createFeedback);
router.get('/getfb', getFeedback)
export default router;