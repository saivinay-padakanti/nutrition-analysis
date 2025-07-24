import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ClipboardList, Upload, FileText, X, Activity } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import type { UserReport } from '../types';

const nutrientRanges = {
  vitaminD: { min: 20, max: 50, unit: 'ng/mL' },
  vitaminB12: { min: 200, max: 900, unit: 'pg/mL' },
  iron: { min: 60, max: 170, unit: 'μg/dL' },
  calcium: { min: 8.5, max: 10.5, unit: 'mg/dL' },
  protein: { min: 6, max: 8.3, unit: 'g/dL' },
  zinc: { min: 60, max: 120, unit: 'μg/dL' },
  magnesium: { min: 1.7, max: 2.2, unit: 'mg/dL' },
  folicAcid: { min: 2, max: 20, unit: 'ng/mL' },
};

export function UserReportForm({ onSubmit }: { onSubmit: (data: UserReport) => void }) {
  const { register, handleSubmit, setValue, watch } = useForm<UserReport>();
  const reports = watch('medicalReports') || [];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setValue('medicalReports', [...reports, ...acceptedFiles]);
  }, [reports, setValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg']
    }
  });

  const removeFile = (index: number) => {
    setValue('medicalReports', reports.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex items-center gap-2 text-2xl font-semibold text-emerald-700">
        <ClipboardList className="h-8 w-8" />
        <h2>Health Information</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Medical Reports</h3>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">
            {isDragActive
              ? 'Drop your files here'
              : 'Drag & drop your medical reports here, or click to select files'}
          </p>
          <p className="text-sm text-gray-500 mt-2">Supported formats: PDF, PNG, JPG</p>
        </div>

        {reports.length > 0 && (
          <div className="mt-4 space-y-2">
            {reports.map((file: File, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm text-gray-700">{file.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            {...register('age', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            {...register('gender', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <input
            type="number"
            step="0.1"
            {...register('weight', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
          <input
            type="number"
            {...register('height', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Blood Pressure</label>
          <input
            type="text"
            placeholder="120/80"
            {...register('bloodPressure', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Blood Sugar (mg/dL)</label>
          <input
            type="number"
            {...register('bloodSugar', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Last Test Date</label>
          <input
            type="date"
            {...register('lastTestDate', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="h-6 w-6 text-emerald-600" />
          <h3 className="text-lg font-medium text-gray-900">Nutrient Levels</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(nutrientRanges).map(([nutrient, range]) => (
            <div key={nutrient}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {nutrient.replace(/([A-Z])/g, ' $1').trim()} ({range.unit})
              </label>
              <div className="mt-1 relative">
                <input
                  type="number"
                  step="0.1"
                  {...register(`nutrients.${nutrient as keyof UserReport['nutrients']}` as const, { 
                    required: true,
                    min: range.min,
                    max: range.max
                  })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
                <span className="absolute right-0 top-0 text-xs text-gray-500 -mt-4">
                  Normal range: {range.min}-{range.max}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
      >
        Continue to Diet Analysis
      </button>
    </form>
  );
}