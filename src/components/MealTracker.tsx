import React, { useState } from 'react';
import { Plus, Utensils, Search, X } from 'lucide-react';
import type { MealEntry } from '../types';

const commonFoods = [
  { name: 'Apple', calories: 95, defaultQuantity: '1 medium' },
  { name: 'Banana', calories: 105, defaultQuantity: '1 medium' },
  { name: 'Chicken Breast', calories: 165, defaultQuantity: '100g' },
  { name: 'Brown Rice', calories: 216, defaultQuantity: '1 cup cooked' },
  { name: 'Eggs', calories: 70, defaultQuantity: '1 large' },
  { name: 'Salmon', calories: 208, defaultQuantity: '100g' },
  { name: 'Spinach', calories: 7, defaultQuantity: '1 cup raw' },
  { name: 'Greek Yogurt', calories: 130, defaultQuantity: '1 cup' },
  { name: 'Oatmeal', calories: 150, defaultQuantity: '1 cup cooked' },
  { name: 'Almonds', calories: 164, defaultQuantity: '1 oz (23 nuts)' },
];

export function MealTracker({ onSubmit }: { onSubmit: (meals: MealEntry[]) => void }) {
  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [currentMeal, setCurrentMeal] = useState<MealEntry>({
    type: 'breakfast',
    items: [],
    time: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFoods = commonFoods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addFoodItem = (food: typeof commonFoods[0]) => {
    setCurrentMeal({
      ...currentMeal,
      items: [...currentMeal.items, {
        name: food.name,
        quantity: food.defaultQuantity,
        calories: food.calories,
      }],
    });
    setSearchTerm('');
  };

  const removeItem = (index: number) => {
    setCurrentMeal({
      ...currentMeal,
      items: currentMeal.items.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMeal.items.length === 0) return;
    
    setMeals([...meals, currentMeal]);
    setCurrentMeal({
      type: 'breakfast',
      items: [],
      time: '',
    });
  };

  const totalCalories = currentMeal.items.reduce((sum, item) => sum + item.calories, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-2xl font-semibold text-emerald-700">
        <Utensils className="h-8 w-8" />
        <h2>Meal Tracker</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Meal Type</label>
            <select
              value={currentMeal.type}
              onChange={(e) => setCurrentMeal({ ...currentMeal, type: e.target.value as MealEntry['type'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              value={currentMeal.time}
              onChange={(e) => setCurrentMeal({ ...currentMeal, time: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center border border-gray-300 rounded-md">
            <Search className="h-5 w-5 text-gray-400 ml-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for food items..."
              className="block w-full py-2 pl-3 pr-10 border-0 rounded-md focus:ring-0 focus:border-emerald-500 sm:text-sm"
            />
          </div>

          {searchTerm && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
              {filteredFoods.map((food, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => addFoodItem(food)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                >
                  <div className="flex justify-between items-center">
                    <span>{food.name}</span>
                    <span className="text-sm text-gray-500">{food.calories} cal</span>
                  </div>
                  <span className="text-xs text-gray-500">{food.defaultQuantity}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {currentMeal.items.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Current Meal Items</h3>
            <div className="space-y-2">
              {currentMeal.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.quantity} • {item.calories} calories</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <div className="pt-2 border-t border-gray-200">
                <p className="text-right font-medium">
                  Total Calories: {totalCalories}
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={currentMeal.items.length === 0}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Add Meal
        </button>
      </form>

      {meals.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Recorded Meals</h3>
          <div className="space-y-4">
            {meals.map((meal, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-lg font-medium capitalize">{meal.type}</h4>
                  <span className="text-sm text-gray-500">{meal.time}</span>
                </div>
                <div className="space-y-2">
                  {meal.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between text-sm text-gray-600">
                      <span>{item.name} - {item.quantity}</span>
                      <span>{item.calories} calories</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-right font-medium">
                    Total: {meal.items.reduce((sum, item) => sum + item.calories, 0)} calories
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onSubmit(meals)}
            className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Analyze Diet
          </button>
        </div>
      )}
    </div>
  );
}