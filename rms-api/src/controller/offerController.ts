import { Request, Response } from 'express';
import Offer from '../model/offerModel';

export const getOffers = async (req: Request, res: Response) => {
    try {
      const offers = await Offer.find();
      res.status(200).json(offers.map(offer => ({
        id: offer._id.toString(), // Send _id as id
        name: offer.name,
        price: offer.price,
        description: offer.description,
        image: offer.image,
      })));
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  };
  

export const getOfferById = async (req: Request, res: Response) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    res.status(200).json(offer);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const addOffer = async (req: Request, res: Response) => {
  try {
    const { name, price, description } = req.body;
    const image = req.file ? `http://localhost:5000/${req.file.path}` : undefined;

    if (!name || !price || !description) {
      return res.status(400).json({ message: 'Name, price, and description are required' });
    }

    const newOffer = new Offer({ name, price, description, image });
    await newOffer.save();
    res.status(201).json(newOffer);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const editOffer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData: any = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    };

    if (req.file) {
      updatedData.image = `http://localhost:5000/${req.file.path}`;
    }

    const updatedOffer = await Offer.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedOffer) return res.status(404).json({ message: 'Offer not found' });

    res.status(200).json(updatedOffer);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const deleteOffer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedOffer = await Offer.findByIdAndDelete(id);

    if (!deletedOffer) return res.status(404).json({ message: 'Offer not found' });
    res.status(200).json({ message: 'Offer deleted' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
