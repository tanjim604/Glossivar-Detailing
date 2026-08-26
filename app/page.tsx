"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, Zap, Anchor, Car, Phone, Sparkles, ChevronRight } from 'lucide-react';
import InteractiveServices from './components/InteractiveServices';
import QuoteModal from './components/QuoteModal';

export default function Home() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen text-slate-900 font-sans relative bg-gradient-to-b from-[#f4f7f5] via-[#eef5f2] to-[#faf8f5] selection:bg-emerald-900 selection:text-emerald-100 overflow-hidden">
      
      {/* Dynamic Animated Ambient Gradient Blobs (Rich, Fresh Mesh Overlay) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-gradient-to-tr from-emerald-300/35 via-teal-200/40 to-amber-200/30 blur-[140px] rounded-full pointer-events-none -z-10 animate-pulse duration-1000" />
      <div className="absolute top-[600px] -right-32 w-[800px] h-[800px] bg-gradient-to-bl from-teal-200/45 via-emerald-100/35 to-amber-100/40 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[1500px] -left-40 w-[900px] h-[900px] bg-gradient-to-tr from-emerald-200/40 via-cyan-100/35 to-amber-200/30 blur-[160px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[600px] bg-gradient-to-t from-emerald-300/25 via-teal-200/30 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Modal Integration */}
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />

      {/* Glassmorphic Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-white/60 border-b border-emerald-900/10 shadow-[0_4px_30px_rgba(6,78,59,0.04)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-black tracking-tight text-slate-900">
              GLOSS<span className="text-emerald-600">IVA</span>
            </div>
            <span className="text-[10px] font-extrabold tracking-widest text-emerald-800 uppercase bg-emerald-100/60 border border-emerald-300/60 px-2.5 py-0.5 rounded-full">
              Detailing
            </span>
          </div>
          
          <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-700">
            <a href="#services" className="hover:text-emerald-700 transition-colors">Services</a>
            <a href="#about" className="hover:text-emerald-700 transition-colors">Quality</a>
            <a href="#contact" className="hover:text-emerald-700 transition-colors">Contact</a>
          </nav>
          
          <button
            onClick={() => setIsQuoteOpen(true)}
            className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 hover:from-emerald-900 hover:to-teal-800 text-amber-300 font-bold px-6 py-2.5 rounded-full transition-all duration-300 text-sm shadow-md shadow-emerald-950/20 hover:-translate-y-0.5"
          >
             Get a Quote
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-36 px-6 overflow-hidden">
        {/* Background Image Blend */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg-hero.jpg"
            alt="Glossiva Mobile Detailing Background"
            fill
            priority
            className="object-cover object-center opacity-15 mix-blend-overlay"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100/90 via-teal-50/90 to-amber-100/90 border border-emerald-300/60 text-emerald-900 px-5 py-2.5 rounded-full text-xs font-bold mb-8 shadow-sm backdrop-blur-md">
            <Zap className="w-4 h-4 text-emerald-600 fill-emerald-600" /> 100% Mobile Service — We Come To You!
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.02] text-slate-900">
            The Ultimate <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-800 via-teal-600 to-amber-600 bg-clip-text text-transparent">
              Reflection of Quality.
            </span>
          </h1>
          
          <p className="text-slate-700 max-w-3xl mx-auto text-xl sm:text-2xl mb-12 leading-relaxed font-normal">
            Premium mobile automotive detailing & marine restoration brought straight to your <span className="text-emerald-950 font-semibold underline decoration-amber-500/60 decoration-2 underline-offset-4">driveway, dock, or marina</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <a
              href="#services"
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 hover:from-emerald-700 hover:to-teal-700 text-amber-300 font-bold px-10 py-4.5 rounded-2xl transition-all duration-300 text-lg shadow-xl shadow-emerald-950/20 hover:-translate-y-1 flex items-center justify-center gap-2 group"
            >
              Explore Services
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="w-full sm:w-auto bg-white/70 hover:bg-white text-emerald-950 font-bold px-10 py-4.5 rounded-2xl transition-all duration-300 text-lg border border-emerald-900/15 shadow-lg shadow-emerald-900/5 backdrop-blur-md hover:-translate-y-1"
            >
              Get Instant Quote
            </button>
          </div>
        </div>
      </section>

      {/* Services Section (Floating Frosted Canvas) */}
      <section id="services" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-900 bg-emerald-100/80 border border-emerald-300/60 px-3 py-1 rounded-full shadow-sm">
              Our Craft
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mt-4 mb-4">
              Our Elite Services
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto text-lg">
              Click any service card below to view our detailed process and custom options.
            </p>
          </div>

          <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-6 md:p-10 rounded-[2.5rem] shadow-xl shadow-emerald-900/5">
            <InteractiveServices />
          </div>
        </div>
      </section>

      {/* Features / Why Us Section */}
      <section id="about" className="py-28 max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-900 bg-amber-100/80 border border-amber-300/60 px-3 py-1 rounded-full shadow-sm">
            Why Choose Us
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mt-4 mb-4">
            Uncompromising Standards
          </h2>
          <p className="text-slate-600 text-lg max-w-lg mx-auto">
            Engineered detailing processes crafted for maximum gloss, protection, and complete convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl group transition-all duration-300 hover:border-emerald-500 hover:bg-white/80 hover:shadow-2xl hover:shadow-emerald-950/10 hover:-translate-y-1.5 relative overflow-hidden">
            <div className="w-14 h-14 bg-gradient-to-tr from-emerald-800 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-900/20 text-amber-300">
              <Car className="w-7 h-7 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900">Mobile Automotive Care</h3>
            <p className="text-slate-600 text-base leading-relaxed">
              We bring professional machine polishing, ceramic coating, and deep interior restoration directly to your doorstep.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl group transition-all duration-300 hover:border-teal-500 hover:bg-white/80 hover:shadow-2xl hover:shadow-teal-950/10 hover:-translate-y-1.5 relative overflow-hidden">
            <div className="w-14 h-14 bg-gradient-to-tr from-teal-800 to-cyan-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-900/20 text-cyan-200">
              <Anchor className="w-7 h-7 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900">On-Site Marine Detailing</h3>
            <p className="text-slate-600 text-base leading-relaxed">
              Gelcoat restoration, oxidation removal, and hull sealing performed right at your dock or marina.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl group transition-all duration-300 hover:border-amber-500 hover:bg-white/80 hover:shadow-2xl hover:shadow-amber-950/10 hover:-translate-y-1.5 relative overflow-hidden">
            <div className="w-14 h-14 bg-gradient-to-tr from-amber-600 to-emerald-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-900/20 text-white">
              <ShieldCheck className="w-7 h-7 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900">Certified Protection</h3>
            <p className="text-slate-600 text-base leading-relaxed">
              Accredited installers of premium ceramic coatings with verified durability warranties for vehicles and watercraft.
            </p>
          </div>
        </div>
      </section>

      {/* Call-To-Action Banner */}
      <section id="contact" className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 border border-emerald-800/40 p-10 md:p-16 rounded-[2.5rem] shadow-2xl shadow-emerald-950/20 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold text-amber-300 mb-6">
                <Sparkles className="w-4 h-4 text-amber-300" /> Premium Detailing Experience
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-8">
                Ready to Experience Glossiva?
              </h2>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 bg-white/10 backdrop-blur-xl border border-white/15 p-6 md:p-8 rounded-2xl max-w-3xl mx-auto">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md border border-white/20">
                     <Phone className="w-7 h-7 text-amber-300" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold uppercase tracking-wider text-emerald-200">Call or Text</div>
                    <div className="font-extrabold text-2xl text-white tracking-tight">(604) 782-9107</div>
                  </div>
                </div>
                <div className="h-12 w-px bg-white/20 hidden sm:block" />
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-8 py-4 rounded-xl transition-all duration-300 text-lg shadow-lg hover:shadow-amber-400/20 hover:scale-105"
                >
                  Get Instant Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-sm font-medium text-slate-500 border-t border-emerald-900/10 bg-white/40 backdrop-blur-md">
        © {new Date().getFullYear()} Glossiva Detailing. All rights reserved.
      </footer>
    </div>
  );
}