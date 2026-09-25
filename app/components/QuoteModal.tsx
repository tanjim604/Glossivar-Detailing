"use client";

import React, { useState } from 'react';
import { X, Car, Anchor, Calendar, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceType?: 'auto' | 'boat' | 'maintenance';
}

const MAINTENANCE_SERVICES = [
  { id: 'wash', name: 'Exterior Hand Wash & Dry' },
  { id: 'vacuum', name: 'Interior Deep Vacuum' },
  { id: 'wipe', name: 'Dashboard & Panel Wipe Down' },
  { id: 'shampoo', name: 'Seat & Fabric Spot Shampoo' },
  { id: 'shine', name: 'Tire Shine & Rim Polish' },
  { id: 'protectant', name: 'Interior UV Protectant' },
  { id: 'windows', name: 'Streak-Free Window Clean' },
  { id: 'mats', name: 'Floor Mat Wash & Sanitize' },
];

export default function QuoteModal({ isOpen, onClose, initialServiceType }: QuoteModalProps) {
  const [step, setStep] = useState<'type' | 'options' | 'result'>(initialServiceType ? 'options' : 'type');
  const [serviceType, setServiceType] = useState<'auto' | 'boat' | 'maintenance' | null>(initialServiceType || null);
  
  // Frequency State
  const [frequency, setFrequency] = useState<'one_time' | 'monthly' | '3_months' | '6_months'>('one_time');

  // Auto State
  const [vehicleType, setVehicleType] = useState<'sedan' | 'suv' | 'truck'>('sedan');
  const [hasPetHair, setHasPetHair] = useState<boolean>(false);
  const [autoScope, setAutoScope] = useState<'full' | 'interior'>('full');

  // Maintenance Plan State
  const [selectedMaintenance, setSelectedMaintenance] = useState<string[]>([]);

  // Boat State
  const [boatLength, setBoatLength] = useState<number>(15);

  // Contact Info State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const toggleMaintenanceService = (id: string) => {
    setSelectedMaintenance((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculatePrice = (): number => {
    if (serviceType === 'auto') {
      let base = 230;
      if (vehicleType === 'suv') base = 260;
      if (vehicleType === 'truck') base = 280;
      if (autoScope === 'interior') base -= 30;
      if (hasPetHair) base += 40;
      return base;
    } 
    
    if (serviceType === 'maintenance') {
      return selectedMaintenance.length * 30;
    }

    if (serviceType === 'boat') {
      const basePrice = 500;
      return boatLength <= 20 ? basePrice : basePrice + (boatLength - 20) * 40;
    }

    return 0;
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingData = {
      name: clientName,
      phone: clientPhone,
      service: serviceType,
      frequency: frequency,
      details: serviceType === 'auto' 
        ? { vehicleType, autoScope, hasPetHair } 
        : serviceType === 'maintenance'
        ? { selectedServices: selectedMaintenance.map(id => MAINTENANCE_SERVICES.find(s => s.id === id)?.name) }
        : { boatLength },
      estimatedPrice: calculatePrice(),
    };

    try {
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('There was an issue sending your request. Please try again or call us directly!');
      }
    } catch (error) {
      console.error('Failed to submit booking:', error);
      alert('There was an issue submitting your request. Please call us directly!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setStep('type');
    setServiceType(null);
    setFrequency('one_time');
    setSelectedMaintenance([]);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setClientName('');
    setClientPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn" onClick={resetModal}>
      <div className="relative bg-[#0d1117] border border-[#21262d] rounded-3xl max-w-lg w-full p-8 shadow-2xl text-white" onClick={(e) => e.stopPropagation()}>
        
        <button onClick={resetModal} className="absolute top-6 right-6 text-slate-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        {/* STEP 1: Select Type */}
        {step === 'type' && (
          <div>
            <h3 className="text-2xl font-bold mb-2">Get an Instant Quote</h3>
            <p className="text-slate-400 text-sm mb-6">Select your package category:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <button
                onClick={() => { setServiceType('auto'); setStep('options'); }}
                className="p-5 border border-[#21262d] bg-[#161b22] hover:border-blue-500 rounded-2xl flex flex-col items-center justify-center gap-2 transition group"
              >
                <Car className="w-8 h-8 text-blue-400 group-hover:scale-110 transition" />
                <span className="font-bold text-sm">Automotive</span>
              </button>

              <button
                onClick={() => { setServiceType('maintenance'); setStep('options'); }}
                className="p-5 border border-[#21262d] bg-[#161b22] hover:border-emerald-500 rounded-2xl flex flex-col items-center justify-center gap-2 transition group"
              >
                <Calendar className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition" />
                <span className="font-bold text-sm">Maintenance</span>
              </button>

              <button
                onClick={() => { setServiceType('boat'); setStep('options'); }}
                className="p-5 border border-[#21262d] bg-[#161b22] hover:border-teal-500 rounded-2xl flex flex-col items-center justify-center gap-2 transition group"
              >
                <Anchor className="w-8 h-8 text-teal-400 group-hover:scale-110 transition" />
                <span className="font-bold text-sm">Marine</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Configure Options & Frequency */}
        {step === 'options' && (
          <div className="space-y-6">
            <button onClick={() => setStep('type')} className="text-xs text-slate-400 flex items-center gap-1 hover:text-white">
              <ArrowLeft className="w-3 h-3" /> Back
            </button>
            
            <h3 className="text-2xl font-bold">
              {serviceType === 'auto' ? 'Automotive Options' : serviceType === 'maintenance' ? 'Custom Maintenance Menu' : 'Boat Length'}
            </h3>

            {/* Frequency Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Service Frequency
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'one_time', label: 'One-Time' },
                  { id: 'monthly', label: 'Monthly' },
                  { id: '3_months', label: 'Every 3 Mos' },
                  { id: '6_months', label: 'Every 6 Mos' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFrequency(item.id as any)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition ${
                      frequency === item.id
                        ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                        : 'bg-[#161b22] border-[#21262d] text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Maintenance Options */}
            {serviceType === 'maintenance' && (
              <div className="space-y-3">
                <p className="text-xs text-emerald-400 font-medium">
                  Select at least 3 services ($30 CAD each):
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-52 overflow-y-auto pr-1">
                  {MAINTENANCE_SERVICES.map((s) => {
                    const isChecked = selectedMaintenance.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleMaintenanceService(s.id)}
                        className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition ${
                          isChecked
                            ? 'bg-emerald-950/80 border-emerald-500 text-white'
                            : 'bg-[#161b22] border-[#21262d] text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span>{s.name}</span>
                        <span className="text-[10px] text-amber-300 font-bold">$30 CAD</span>
                      </button>
                    );
                  })}
                </div>

                {selectedMaintenance.length < 3 && (
                  <p className="text-xs text-rose-400">
                    * Please choose {3 - selectedMaintenance.length} more service(s) to proceed.
                  </p>
                )}
              </div>
            )}

            {/* Automotive Options */}
            {serviceType === 'auto' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Vehicle Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'sedan', label: 'Sedan' },
                      { id: 'suv', label: 'SUV' },
                      { id: 'truck', label: 'Truck/Van' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setVehicleType(item.id as 'sedan' | 'suv' | 'truck')}
                        className={`py-2.5 rounded-lg text-sm font-semibold border transition ${
                          vehicleType === item.id 
                            ? 'bg-blue-600 border-blue-500 text-white' 
                            : 'bg-[#161b22] border-[#21262d] text-slate-300'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Service Package</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAutoScope('full')}
                      className={`py-2.5 rounded-lg text-sm font-semibold border ${
                        autoScope === 'full' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#161b22] border-[#21262d] text-slate-300'
                      }`}
                    >
                      Full Detail
                    </button>
                    <button
                      type="button"
                      onClick={() => setAutoScope('interior')}
                      className={`py-2.5 rounded-lg text-sm font-semibold border ${
                        autoScope === 'interior' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#161b22] border-[#21262d] text-slate-300'
                      }`}
                    >
                      Interior Only (-$30)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Excessive Pet Hair?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setHasPetHair(false)}
                      className={`py-2.5 rounded-lg text-sm font-semibold border ${
                        !hasPetHair ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#161b22] border-[#21262d] text-slate-300'
                      }`}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasPetHair(true)}
                      className={`py-2.5 rounded-lg text-sm font-semibold border ${
                        hasPetHair ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#161b22] border-[#21262d] text-slate-300'
                      }`}
                    >
                      Yes (+$40)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Boat Options */}
            {serviceType === 'boat' && (
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Select Boat Length</label>
                <select
                  value={boatLength}
                  onChange={(e) => setBoatLength(Number(e.target.value))}
                  className="w-full bg-[#161b22] border border-[#21262d] rounded-xl p-4 text-white text-lg focus:outline-none focus:border-teal-500"
                >
                  {Array.from({ length: 16 }, (_, i) => 15 + i).map((feet) => (
                    <option key={feet} value={feet}>
                      {feet} Feet
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={() => setStep('result')}
              disabled={serviceType === 'maintenance' && selectedMaintenance.length < 3}
              className="mt-6 w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
            >
              Calculate Estimated Price <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 3: Estimated Price & Contact Info */}
        {step === 'result' && !isSubmitted && (
          <div>
            <button onClick={() => setStep('options')} className="text-xs text-slate-400 flex items-center gap-1 mb-4 hover:text-white">
              <ArrowLeft className="w-3 h-3" /> Adjust Options
            </button>

            <div className="text-center bg-[#161b22] border border-[#21262d] p-6 rounded-2xl mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Estimated Total</span>
              <div className="text-5xl font-black text-emerald-400 mt-1">${calculatePrice()} CAD</div>
              <span className="text-xs text-slate-400 font-medium capitalize mt-1 block">
                {frequency === 'one_time' ? 'One-Time Service' : `Recurring (${frequency.replace('_', ' ')})`}
              </span>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-[#161b22] border border-[#21262d] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="(604) 000-0000"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-[#161b22] border border-[#21262d] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-900 text-white font-bold py-4 rounded-xl transition text-lg mt-2 shadow-lg shadow-emerald-600/30 flex justify-center items-center"
              >
                {isSubmitting ? 'Sending Request...' : 'Book Now'}
              </button>
            </form>
          </div>
        )}

        {/* STEP 4: Success Message */}
        {isSubmitted && (
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold mb-2">Booking Request Sent!</h3>
            <p className="text-slate-400 text-sm mb-6">
              Thank you, <span className="text-white font-semibold">{clientName}</span>. We have received your estimate of <span className="text-emerald-400 font-bold">${calculatePrice()} CAD</span> and will text/call <span className="text-white font-semibold">{clientPhone}</span> to finalize your booking schedule!
            </p>
            <button
              onClick={resetModal}
              className="bg-[#161b22] hover:bg-[#21262d] text-white px-6 py-2.5 rounded-xl font-semibold text-sm border border-[#21262d]"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
}