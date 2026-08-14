"use client";

import React, { useState } from 'react';
import { X, Car, Anchor, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  // Navigation State
  const [step, setStep] = useState<'type' | 'options' | 'result'>('type');
  
  // Selection State
  const [serviceType, setServiceType] = useState<'auto' | 'boat' | null>(null);
  
  // Auto State
  const [vehicleType, setVehicleType] = useState<'sedan' | 'suv' | 'truck'>('sedan');
  const [hasPetHair, setHasPetHair] = useState<boolean>(false);
  const [autoScope, setAutoScope] = useState<'full' | 'interior'>('full');

  // Boat State
  const [boatLength, setBoatLength] = useState<number>(15);

  // Contact Info State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // --- PRICING LOGIC ---
  const calculatePrice = (): number => {
    if (serviceType === 'auto') {
      let base = 0;
      if (vehicleType === 'sedan') {
        base = autoScope === 'full' ? 180 : 160;
      } else if (vehicleType === 'suv') {
        base = autoScope === 'full' ? 200 : 180;
      } else if (vehicleType === 'truck') {
        base = autoScope === 'full' ? 250 : 230;
      }
      
      if (hasPetHair) base += 40;
      return base;
    } 
    
    if (serviceType === 'boat') {
      const basePrice = 500; // For 15 to 20 feet
      if (boatLength <= 20) {
        return basePrice;
      } else {
        const extraFeet = boatLength - 20;
        return basePrice + extraFeet * 40;
      }
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
      details: serviceType === 'auto' 
        ? { vehicleType, autoScope, hasPetHair } 
        : { boatLength },
      estimatedPrice: calculatePrice(),
    };

    try {
      // Send data to Next.js API route which triggers Twilio SMS
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
    setIsSubmitted(false);
    setIsSubmitting(false);
    setClientName('');
    setClientPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn" onClick={resetModal}>
      <div className="relative bg-[#0d1117] border border-[#21262d] rounded-3xl max-w-lg w-full p-8 shadow-2xl text-white" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button onClick={resetModal} className="absolute top-6 right-6 text-slate-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        {/* STEP 1: Select Vehicle Type */}
        {step === 'type' && (
          <div>
            <h3 className="text-2xl font-bold mb-2">Get an Instant Quote</h3>
            <p className="text-slate-400 text-sm mb-6">Select what you would like us to detail:</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => { setServiceType('auto'); setStep('options'); }}
                className="p-6 border border-[#21262d] bg-[#161b22] hover:border-blue-500 rounded-2xl flex flex-col items-center justify-center gap-3 transition group"
              >
                <Car className="w-10 h-10 text-blue-400 group-hover:scale-110 transition" />
                <span className="font-bold">Automotive</span>
              </button>

              <button
                onClick={() => { setServiceType('boat'); setStep('options'); }}
                className="p-6 border border-[#21262d] bg-[#161b22] hover:border-teal-500 rounded-2xl flex flex-col items-center justify-center gap-3 transition group"
              >
                <Anchor className="w-10 h-10 text-teal-400 group-hover:scale-110 transition" />
                <span className="font-bold">Boat / Marine</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Configure Options */}
        {step === 'options' && (
          <div>
            <button onClick={() => setStep('type')} className="text-xs text-slate-400 flex items-center gap-1 mb-4 hover:text-white">
              <ArrowLeft className="w-3 h-3" /> Back
            </button>
            
            <h3 className="text-2xl font-bold mb-6">
              {serviceType === 'auto' ? 'Automotive Options' : 'Boat Length'}
            </h3>

            {/* Automotive Options */}
            {serviceType === 'auto' && (
              <div className="space-y-5">
                {/* Vehicle Category */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Vehicle Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['sedan', 'suv', 'truck'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setVehicleType(type)}
                        className={`py-2.5 rounded-lg text-sm font-semibold capitalize border ${
                          vehicleType === type ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#161b22] border-[#21262d] text-slate-300'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scope */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Service Package</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setAutoScope('full')}
                      className={`py-2.5 rounded-lg text-sm font-semibold border ${
                        autoScope === 'full' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#161b22] border-[#21262d] text-slate-300'
                      }`}
                    >
                      Full Detail
                    </button>
                    <button
                      onClick={() => setAutoScope('interior')}
                      className={`py-2.5 rounded-lg text-sm font-semibold border ${
                        autoScope === 'interior' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#161b22] border-[#21262d] text-slate-300'
                      }`}
                    >
                      Interior Only
                    </button>
                  </div>
                </div>

                {/* Pet Hair */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Excessive Pet Hair?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setHasPetHair(false)}
                      className={`py-2.5 rounded-lg text-sm font-semibold border ${
                        !hasPetHair ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#161b22] border-[#21262d] text-slate-300'
                      }`}
                    >
                      No
                    </button>
                    <button
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
              <div className="space-y-4">
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
                <p className="text-xs text-slate-400">Includes complete exterior hull gelcoat wash & restoration prep.</p>
              </div>
            )}

            <button
              onClick={() => setStep('result')}
              className="mt-8 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
            >
              Calculate Estimated Price <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 3: Estimated Price & Contact Information */}
        {step === 'result' && !isSubmitted && (
          <div>
            <button onClick={() => setStep('options')} className="text-xs text-slate-400 flex items-center gap-1 mb-4 hover:text-white">
              <ArrowLeft className="w-3 h-3" /> Adjust Options
            </button>

            <div className="text-center bg-[#161b22] border border-[#21262d] p-6 rounded-2xl mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Estimated Total</span>
              <div className="text-5xl font-black text-blue-400 mt-1">${calculatePrice()}</div>
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
                  className="w-full bg-[#161b22] border border-[#21262d] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="(555) 000-0000"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-[#161b22] border border-[#21262d] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold py-4 rounded-xl transition text-lg mt-2 shadow-lg shadow-blue-600/30 flex justify-center items-center"
              >
                {isSubmitting ? 'Sending Request...' : 'Book Now'}
              </button>
            </form>
          </div>
        )}

        {/* STEP 4: Success Message */}
        {isSubmitted && (
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-teal-400 mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold mb-2">Booking Request Sent!</h3>
            <p className="text-slate-400 text-sm mb-6">
              Thank you, <span className="text-white font-semibold">{clientName}</span>. We have saved your estimate of <span className="text-blue-400 font-bold">${calculatePrice()}</span> and will text/call <span className="text-white font-semibold">{clientPhone}</span> shortly to confirm your booking date!
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