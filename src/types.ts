export interface UserReport {
  age: number;
  gender: 'male' | 'female' | 'other';
  weight: number;
  height: number;
  bloodPressure: string;
  bloodSugar: number;
  cholesterol: number;
  existingConditions: string[];
  medicalReports?: File[];
  nutrients: {
    vitaminD: number;
    vitaminB12: number;
    iron: number;
    calcium: number;
    protein: number;
    zinc: number;
    magnesium: number;
    folicAcid: number;
  };
  lastTestDate: string;
}

export interface MealEntry {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  items: {
    name: string;
    quantity: string;
    calories: number;
  }[];
  time: string;
}

export interface HealthAnalysis {
  nutritionalStatus: {
    category: string;
    description: string;
  };
  deficiencies: {
    nutrient: string;
    severity: 'low' | 'moderate' | 'severe';
    recommendations: string[];
  }[];
  potentialRisks: {
    condition: string;
    riskLevel: 'low' | 'moderate' | 'high';
    preventiveMeasures: string[];
  }[];
}