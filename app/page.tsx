"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, Zap, Anchor, Car, Phone, Sparkles } from 'lucide-react';
import InteractiveServices from './components/InteractiveServices';
import QuoteModal from './components/QuoteModal';

export default function Home() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen text-slate-100 font-sans relative bg-[#02040a]">
      {/* Modal Integration */}
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />

      {/* Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-[#02040a]/80 border-b border-[#21262d]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter text-white">
            GLOSS<span className="text-blue-500">IVA</span>
            <span className="text-sm font-light text-slate-500 ml-1">Detailing</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
            <a href="#services" className="hover:text-white transition">Services</a>
            <a href="#about" className="hover:text-white transition">Quality</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </nav>
          <button
            onClick={() => setIsQuoteOpen(true)}
            className="bg-slate-100 hover:bg-white text-black font-bold px-5 py-2.5 rounded-full transition text-sm flex items-center gap-2 group shadow-lg"
          >
             Get a Quote
          </button>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg-hero.jpg"
            alt="Glossiva Mobile Detailing Background"
            fill
            priority
            className="object-cover object-center opacity-40"
          />
          {/* Dark Overlay Gradient for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/80 via-[#02040a]/60 to-[#02040a]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2.5 bg-blue-950/80 backdrop-blur-md border border-blue-800/70 text-blue-200 px-5 py-2 rounded-full text-xs font-bold mb-8 shadow-inner shadow-blue-900/50">
            <Zap className="w-4 h-4 text-blue-400" /> 100% Mobile Service — We Come To You!
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter mb-8 leading-[0.95]">
            The Ultimate <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-purple-500 bg-clip-text text-transparent">
              Reflection of Quality.
            </span>
          </h1>
          
          <p className="text-slate-300 max-w-3xl mx-auto text-xl mb-12 leading-relaxed drop-shadow-md">
            Premium mobile automotive detailing & marine restoration brought straight to your <span className='text-white font-semibold'>driveway, dock, or marina</span>.
          </p>
          
          <div className="flex justify-center gap-5">
            <a
              href="#services"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-full transition text-lg shadow-lg shadow-blue-700/30"
            >
              Explore Services
            </a>
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="bg-black/60 hover:bg-black/80 backdrop-blur-md text-white font-medium px-8 py-4 rounded-full transition text-lg border border-slate-700"
            >
              Get Instant Quote
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#0d1117]/60 border-y border-[#21262d]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold tracking-tight text-white mb-5">Our Elite Services</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
              Click any service card below to view our detailed process and custom options.
            </p>
          </div>

          <InteractiveServices />
          
        </div>
      </section>

      {/* Features / Why Us Section */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold tracking-tight text-white mb-5">Uncompromising Standards</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-8 bg-[#0d1117] border border-[#21262d] rounded-2xl group transition-all hover:border-sky-800">
            <Car className="w-12 h-12 text-sky-400 mb-6 group-hover:animate-pulse" />
            <h3 className="text-2xl font-bold mb-3 text-white">Mobile Automotive Care</h3>
            <p className="text-slate-400 text-base leading-relaxed">
              We bring professional machine polishing, ceramic coating, and deep interior restoration directly to your doorstep.
            </p>
          </div>
          <div className="p-8 bg-[#0d1117] border border-[#21262d] rounded-2xl group transition-all hover:border-teal-800">
            <Anchor className="w-12 h-12 text-teal-400 mb-6 group-hover:animate-pulse" />
            <h3 className="text-2xl font-bold mb-3 text-white">On-Site Marine Detailing</h3>
            <p className="text-slate-400 text-base leading-relaxed">
              Gelcoat restoration, oxidation removal, and hull sealing performed right at your dock or marina.
            </p>
          </div>
          <div className="p-8 bg-[#0d1117] border border-[#21262d] rounded-2xl group transition-all hover:border-rose-800">
            <ShieldCheck className="w-12 h-12 text-rose-400 mb-6 group-hover:animate-pulse" />
            <h3 className="text-2xl font-bold mb-3 text-white">Certified Protection</h3>
            <p className="text-slate-400 text-base leading-relaxed">
              Accredited installers of premium ceramic coatings with verified durability warranties for vehicles and watercraft.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#0d1117]/80 border-t border-[#21262d]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Sparkles className="w-10 h-10 text-amber-400 mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl font-extrabold tracking-tight text-white mb-6">Ready to Experience Glossiva?</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 bg-black/60 border border-[#21262d] p-10 rounded-3xl shadow-2xl">
            <div className="flex items-center gap-4">
              <div className='p-4 bg-blue-950/60 rounded-full border border-blue-800/50'>
                 <Phone className="w-7 h-7 text-blue-400" />
              </div>
              <div className="text-left">
                <div className="text-sm text-slate-400 font-medium">Call or Text</div>
                <div className="font-extrabold text-2xl text-white tracking-tight">(604) 782-9107</div>
              </div>
            </div>
            <div className="h-12 w-px bg-[#21262d] hidden sm:block"></div>
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="bg-slate-100 hover:bg-white text-black font-bold px-8 py-4 rounded-xl transition text-lg shadow-lg"
            >
              Get Instant Quote
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-sm text-slate-600 border-t border-[#21262d]/60">
        © {new Date().getFullYear()} Glossiva Detailing. All rights reserved.
      </footer>
    </div>
  );
}