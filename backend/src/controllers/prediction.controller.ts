import { Request, Response } from 'express';
import Prediction from '../models/Prediction';
import Medication from '../models/Medication';

export const generatePredictions = async (req: Request, res: Response) => {
  try {
    const { medicationId, days = 30 } = req.body;
    
    const medication = await Medication.findById(medicationId);
    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    // Simple prediction logic (should be replaced with actual ML model)
    const currentStock = medication.currentStock;
    const predictions = [];
    
    for (let i = 1; i <= days; i++) {
      const predictedDate = new Date();
      predictedDate.setDate(predictedDate.getDate() + i);
      
      const predictedAmount = Math.max(0, currentStock - (i * 5)); // Simple linear decrease
      const riskLevel = predictedAmount < medication.minStock ? 'Alto' : 
                       predictedAmount < medication.minStock * 2 ? 'Moderado' : 'Bajo';
      
      predictions.push({
        medicationId,
        predictedDate,
        predictedAmount,
        currentStock,
        riskLevel
      });
    }

    await Prediction.deleteMany({ medicationId }); // Remove old predictions
    const savedPredictions = await Prediction.insertMany(predictions);
    
    res.json(savedPredictions);
  } catch (error) {
    res.status(500).json({ message: 'Error generating predictions' });
  }
};

export const getPredictions = async (req: Request, res: Response) => {
  try {
    const predictions = await Prediction.find()
      .populate('medicationId')
      .sort({ predictedDate: 1 });
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching predictions' });
  }
};

export const getMedicationPrediction = async (req: Request, res: Response) => {
  try {
    const predictions = await Prediction.find({ medicationId: req.params.id })
      .populate('medicationId')
      .sort({ predictedDate: 1 });
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medication predictions' });
  }
};