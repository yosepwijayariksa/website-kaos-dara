'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['beranda', 'produk', 'tentang', 'testimoni'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleWhatsAppClick = () => {
    const message = 'Halo Admin DARA, saya tertarik dengan produk kaos DARA.\nMohon informasi harga, stok, dan ukuran yang tersedia.\nTerima kasih.';
    const whatsappUrl = `https://wa.me/6285624209964?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const menuItems = [
    { id: 'beranda', label: 'Beranda', icon: null },
    { id: 'produk', label: 'Produk', icon: null },
    { id: 'tentang', label: 'Tentang Kami', icon: null },
    { id: 'testimoni', label: 'Shop Dara', icon: null },    
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => scrollToSection('beranda')}
              className="flex items-center space-x-2 hover:opacity-80 transition-all duration-300 group"
            >
              <div className="relative">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-10 lg:h-10 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <img 
                    src="https://z-cdn-media.chatglm.cn/files/0d96fa0f-e061-4b85-83e9-84c71897c7f9.jpeg?auth_key=1865841865-4eed4ec02877462e82094006c8904964-0-68816be4bf5005e1583772fa0ae631c7"
                    alt="DARA Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900">DARA</span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-all duration-200 hover:text-black ${
                  activeSection === item.id 
                    ? 'text-black font-semibold' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* WhatsApp CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={handleWhatsAppClick}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-black transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Logo in Mobile Menu */}
              <div className="px-3 py-2 border-b border-gray-100 mb-2">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full overflow-hidden shadow-md">
                      <img 
                        src="https://z-cdn-media.chatglm.cn/files/0d96fa0f-e061-4b85-83e9-84c71897c7f9.jpeg?auth_key=1865841865-4eed4ec02877462e82094006c8904964-0-68816be4bf5005e1583772fa0ae631c7"
                        alt="DARA Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <span className="text-lg font-bold text-gray-900">DARA</span>
                </div>
              </div>
              
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    activeSection === item.id
                      ? 'text-black bg-gray-100'
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 pb-2 border-t border-gray-100">
                <Button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Pesan via WhatsApp
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;