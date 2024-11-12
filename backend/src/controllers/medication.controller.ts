import { Request, Response } from 'express';
import Medication from '../models/Medication';
import InventoryMovement from '../models/InventoryMovement';
import Prediction from '../models/Prediction';
import Alert from '../models/Alert';

export const getAllMedications = async (req: Request, res: Response) => {
  try {
    const medications = await Medication.find();
    res.json(medications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medications' });
  }
};

export const getMedicationById = async (req: Request, res: Response) => {
  try {
    const medication = await Medication.findById(req.params.id);
    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }
    res.json(medication);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medication' });
  }
};

export const createMedication = async (req: Request, res: Response) => {
  try {
    const medication = new Medication(req.body);
    await medication.save();
    res.status(201).json(medication);
  } catch (error) {
    res.status(500).json({ message: 'Error creating medication' });
  }
};

export const updateMedication = async (req: Request, res: Response) => {
  try {
    const medication = await Medication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }
    res.json(medication);
  } catch (error) {
    res.status(500).json({ message: 'Error updating medication' });
  }
};

export const deleteMedication = async (req: Request, res: Response) => {
  try {
    const medication = await Medication.findByIdAndDelete(req.params.id);
    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }
    res.json({ message: 'Medication deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting medication' });
  }
};

export const getMedicationMovements = async (req: Request, res: Response) => {
  try {
    const movements = await InventoryMovement.find({
      medicationId: req.params.id
    }).populate('medicationId');
    res.json(movements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medication movements' });
  }
};

export const getMedicationPredictions = async (req: Request, res: Response) => {
  try {
    const predictions = await Prediction.find({
      medicationId: req.params.id
    }).populate('medicationId');
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medication predictions' });
  }
};

export const getMedicationAlerts = async (req: Request, res: Response) => {
  try {
    const alerts = await Alert.find({
      medicationId: req.params.id,
      isActive: true
    }).populate('medicationId');
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medication alerts' });
  }
};