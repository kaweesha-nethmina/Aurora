import express from 'express';
import multer from 'multer';
import { addRoom, getRooms, updateRoom, deleteRoom } from '../controller/roomController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/rooms', upload.single('image'), addRoom);
router.get('/rooms', getRooms);
router.put('/rooms/:id', updateRoom);
router.delete('/rooms/:id', deleteRoom);

export default router;
