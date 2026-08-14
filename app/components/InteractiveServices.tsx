"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { X, CheckCircle2 } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  category: 'Auto' | 'Marine' | 'Paint Correction' | 'Ceramic';
  price: string;
  description: string;
  longDescription: string;
  image: string; // URL path relative to public/ folder
  accentColor: string; // Tailwind class like 'text-blue-400' or 'text-purple-400'
  features: string[];
}

const servicesData: Service[] = [
  {
    id: 'full-detail',
    title: 'Showroom Interior & Exterior',
    category: 'Auto',
    price: '$160+',
    description: 'Deep revitalization using premium polymers and steam cleaning.',
    longDescription: 'Our signature service goes beyond clean. We deep clean every crevice of your interior with specialized steam, condition leather, clay-bar the paintwork to remove embedded contaminants, and finish with a high-definition polymer sealant for a mirror-like finish.',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop', // Interior detail image
    accentColor: 'text-sky-400',
    features: ['Machine applied sealant', 'Clay bar decontamination', 'Steam interior sterilization', 'Engine bay quick-wipe'],
  },
  {
    id: 'cut-polish',
    title: 'Stage 2 Paint Correction',
    category: 'Paint Correction',
    price: '$550+',
    description: 'Eliminate 85%+ of swirl marks, light scratches, and oxidation.',
    longDescription: 'For vehicles that have lost their luster. We analyze paint depth, then execute a precision heavy-cut compounding stage to level defects, followed by a finishing polish to generate ultimate clarity and reflection. Highly recommended before Ceramic Coating.',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop', // Sports car with polished paint
    accentColor: 'text-purple-400',
    features: ['Multi-stage machine polishing', 'Defect removal analysis', 'Panel wipe prep', 'Gloss enhancement'],
  },
  {
    id: 'boat-detail',
    title: 'Marine Restoration & Gelcoat',
    category: 'Marine',
    price: '$40/ft',
    description: 'Bring the shine back to faded hulls and oxidized gelcoat.',
    longDescription: 'Marine environments are brutal. We specialize in gelcoat restoration, using heavy-duty compounding to remove severe oxidation (fading), followed by specialized marine polishes and a durable marine-grade wax or sealant to protect your investment from salt and UV.',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800&auto=format&fit=crop', // Glossy boat hull on water
    accentColor: 'text-teal-400',
    features: ['Oxidation removal compounding', 'Hull scum line removal', 'Teak cleaning', 'Marine vinyl protection'],
  },
  {
    id: 'ceramic',
    title: 'Gtechniq Ceramic Protection',
    category: 'Ceramic',
    price: '$999+',
    description: 'Ultra-hydrophobic 9H hardness layer for years of protection.',
    longDescription: 'The ultimate protection. We apply a Gtechniq accredited ceramic coating, creating a permanent chemical bond with your paintwork. This results in extreme gloss, incredible water repellency (beading), easy maintenance, and certified protection against chemical staining, UV rays, and bird droppings for 3-9 years.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop', // Car with water beading effect
    accentColor: 'text-rose-400',
    features: ['Certified 9H Hardness', '3, 5, or 9 Year Warranties', 'Incredible hydrophobic properties', 'Includes polishing preparation'],
  },
];

export default function InteractiveServices() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {servicesData.map((service) => (
          <div
            key={service.id}
            onClick={() => setSelectedService(service)}
            className="group relative bg-[#0d1117] border border-[#21262d] rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:border-blue-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/30"
          >
            {/* Aspect ratio container for image */}
            <div className="relative aspect-[16/10] overflow-hidden w-full">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-w-7xl) 25vw, (max-w-md) 50vw, 100vw"
              />
              {/* Dark overlay on image */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
              
              {/* Category Badge on Image */}
              <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider text-slate-100 border border-slate-700">
                {service.category}
              </span>
            </div>

            {/* Content below image */}
            <div className="p-6">
              <div className="flex justify-between items-start gap-4 mb-3">
                <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-blue-300 transition">
                  {service.title}
                </h3>
                <span className={`text-2xl font-extrabold ${service.accentColor}`}>
                  {service.price}
                </span>
              </div>
              
              <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                {service.description}
              </p>
              
              {/* "Click for details" prompt */}
              <div className="text-xs font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                 View Details & Process &rarr;
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Service Detail Modal --- */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn" onClick={() => setSelectedService(null)}>
          {/* Modal content box - stopPropagation prevents closing when clicking inside */}
          <div className="relative bg-[#0d1117] border border-[#21262d] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-blue-950/40 p-8 md:p-10 animate-slideUp" onClick={(e) => e.stopPropagation()}>
            
            {/* Close button */}
            <button 
              onClick={() => setSelectedService(null)} 
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition p-1"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-6">
              <span className={`text-5xl font-black ${selectedService.accentColor}`}>
                {selectedService.price}
              </span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {selectedService.category}
                </span>
                <h2 className="text-3xl font-extrabold text-white">
                  {selectedService.title}
                </h2>
              </div>
            </div>

            {/* Main Image in Modal */}
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8 border border-[#21262d]">
                <Image
                    src={selectedService.image}
                    alt={selectedService.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Description */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">Service Overview</h4>
              <p className="text-slate-200 text-lg leading-relaxed">
                {selectedService.longDescription}
              </p>
            </div>

            {/* Key Features/Included */}
            <div className="mb-10">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">What&apos;s Included</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {selectedService.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-[#161b22] border border-[#21262d] p-3 rounded-lg">
                    <CheckCircle2 className={`w-5 h-5 ${selectedService.accentColor}`} />
                    <span className="text-slate-100 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <a
              href="#contact"
              onClick={() => setSelectedService(null)} // Close modal before scrolling
              className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition text-lg shadow-lg shadow-blue-700/20"
            >
              Request Quote for {selectedService.title}
            </a>
          </div>
        </div>
      )}
    </>
  );
}