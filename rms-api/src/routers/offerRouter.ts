import express from 'express';
import multer from 'multer';
import { getOffers, getOfferById, addOffer, editOffer, deleteOffer } from '../controller/offerController';

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.get('/', getOffers);
router.get('/:id', getOfferById);
router.post('/', upload.single('image'), addOffer);
router.put('/:id', upload.single('image'), editOffer);
router.delete('/:id', deleteOffer);

export default router;
