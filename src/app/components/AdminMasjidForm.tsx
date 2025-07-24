'use client';

import React, { useState } from 'react';
import { PlusIcon, XIcon } from 'lucide-react';
import Card from './UI/Card';
import Container from './UI/Container';
import { supabase } from '../lib/supabase';

interface AdminMasjidFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AdminMasjidForm({ onSuccess, onCancel }: AdminMasjidFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    latitude: '',
    longitude: '',
    jummha: [''],
    khudba: [''],
    image: '',
    notes: '',
    fajr: '',
    dhuhr: '',
    asr: '',
    maghrib: '',
    isha: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (field: 'jummha' | 'khudba', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field: 'jummha' | 'khudba') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (field: 'jummha' | 'khudba', index: number) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.name || !formData.address || !formData.city) {
        throw new Error('Name, address, and city are required');
      }

      // Filter out empty jummha and khudba times
      const jummhaFiltered = formData.jummha.filter(time => time.trim() !== '');
      const khudbaFiltered = formData.khudba.filter(imam => imam.trim() !== '');

      if (jummhaFiltered.length === 0) {
        throw new Error('At least one Jummah prayer time is required');
      }

      const { error } = await supabase
        .from('masjids')
        .insert([
          {
            name: formData.name,
            address: formData.address,
            city: formData.city,
            latitude: formData.latitude ? parseFloat(formData.latitude) : null,
            longitude: formData.longitude ? parseFloat(formData.longitude) : null,
            jummha: jummhaFiltered,
            khudba: khudbaFiltered.length > 0 ? khudbaFiltered : ['TBD'],
            image: formData.image || null,
            notes: formData.notes || null,
            fajr: formData.fajr || null,
            dhuhr: formData.dhuhr || null,
            asr: formData.asr || null,
            maghrib: formData.maghrib || null,
            isha: formData.isha || null
          }
        ]);

      if (error) throw error;

      onSuccess();
    } catch (error: unknown) {
      console.error('Error adding masjid:', error);
      setError(error instanceof Error ? error.message : 'Failed to add masjid');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="my-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <PlusIcon className="w-5 h-5 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Add New Masjid</h3>
          </div>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Masjid Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                placeholder="Masjid Al-Noor"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                placeholder="Minneapolis"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Full Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              placeholder="123 Main Street, Minneapolis, MN 55401"
            />
          </div>

          {/* Coordinates */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
                Latitude (Optional)
              </label>
              <input
                type="number"
                step="any"
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                placeholder="44.9778"
              />
            </div>

            <div>
              <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
                Longitude (Optional)
              </label>
              <input
                type="number"
                step="any"
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                placeholder="-93.2650"
              />
            </div>
          </div>

          {/* Jummah Prayer Times */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jummah Prayer Times *
            </label>
            {formData.jummha.map((time, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={time}
                  onChange={(e) => handleArrayChange('jummha', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="12:30 PM"
                />
                {formData.jummha.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField('jummha', index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('jummha')}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              + Add Another Time
            </button>
          </div>

          {/* Imams/Khudba */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imams/Khudba (Optional)
            </label>
            {formData.khudba.map((imam, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={imam}
                  onChange={(e) => handleArrayChange('khudba', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="Imam Abdullah"
                />
                {formData.khudba.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField('khudba', index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('khudba')}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              + Add Another Imam
            </button>
          </div>

          {/* Daily Prayer Times */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">Daily Prayer Times (Optional)</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="fajr" className="block text-sm font-medium text-gray-700 mb-1">
                  Fajr
                </label>
                <input
                  type="text"
                  id="fajr"
                  name="fajr"
                  value={formData.fajr}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="5:00 AM"
                />
              </div>

              <div>
                <label htmlFor="dhuhr" className="block text-sm font-medium text-gray-700 mb-1">
                  Dhuhr
                </label>
                <input
                  type="text"
                  id="dhuhr"
                  name="dhuhr"
                  value={formData.dhuhr}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="1:00 PM"
                />
              </div>

              <div>
                <label htmlFor="asr" className="block text-sm font-medium text-gray-700 mb-1">
                  Asr
                </label>
                <input
                  type="text"
                  id="asr"
                  name="asr"
                  value={formData.asr}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="5:00 PM"
                />
              </div>

              <div>
                <label htmlFor="maghrib" className="block text-sm font-medium text-gray-700 mb-1">
                  Maghrib
                </label>
                <input
                  type="text"
                  id="maghrib"
                  name="maghrib"
                  value={formData.maghrib}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="8:45 PM"
                />
              </div>

              <div>
                <label htmlFor="isha" className="block text-sm font-medium text-gray-700 mb-1">
                  Isha
                </label>
                <input
                  type="text"
                  id="isha"
                  name="isha"
                  value={formData.isha}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="10:00 PM"
                />
              </div>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL (Optional)
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              placeholder="/images/MasjidNames/masjid-name.jpg"
            />
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-none"
              placeholder="Additional information about the masjid..."
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-300 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Adding Masjid...
                </>
              ) : (
                <>
                  <PlusIcon className="w-4 h-4" />
                  Add Masjid
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </Container>
  );
} 