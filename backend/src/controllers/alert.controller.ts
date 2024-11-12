import { Request, Response } from 'express';
import Alert from '../models/Alert';
import Medication from '../models/Medication';

export const createAlert = async (req: Request, res: Response) => {
  try {
    const alert = new Alert(req.body);
    await alert.save();
    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ message: 'Error creating alert' });
  }
};

export const getAlerts = async (req: Request, res: Response) => {
  try {
    const alerts = await Alert.find({ isActive: true })
      .populate('medicationId')
      .sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching alerts' });
  }
};

export const updateAlert = async (req: Request, res: Response) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    res.json(alert);
  } catch (error) {
    res.status(500).json({ message: 'Error updating alert' });
  }
};

export const deleteAlert = async (req: Request, res: Response) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    res.json({ message: 'Alert deactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deactivating alert' });
  }
};

export const checkAlerts = async (req: Request, res: Response) => {
  try {
    const medications = await Medication.find();
    const alerts = [];

    for (const medication of medications) {
      // Check low stock
      if (medication.currentStock <= medication.minStock) {
        alerts.push({
          medicationId: medication._id,
          type: 'lowStock',
          threshold: medication.minStock,
          message: `Stock bajo para ${medication.name}`,
          isActive: true
        });
      }

      // Check expiring soon (30 days)
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      
      if (medication.expirationDate <= thirtyDaysFromNow) {
        alerts.push({
          medicationId: medication._id,
          type: 'expiringSoon',
          threshold: 30,
          message: `${medication.name} expirará pronto`,
          isActive: true
        });
      }
    }

    await Alert.insertMany(alerts);
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Error checking alerts' });
  }
};