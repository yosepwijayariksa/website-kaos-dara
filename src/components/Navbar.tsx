'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['beranda', 'produk', 'tentang'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
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
    const message =
      'Halo Admin DARA, saya tertarik dengan produk kaos DARA.\nMohon informasi harga, stok, dan ukuran yang tersedia.\nTerima kasih.';
    const whatsappUrl = `https://wa.me/6285624209964?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  const menuItems = [
    { id: 'beranda', label: 'Beranda', type: 'scroll' },
    { id: 'produk', label: 'Produk', type: 'scroll' },
    { id: 'tentang', label: 'Tentang Kami', type: 'scroll' },
    {
      label: 'Shop Dara',
      type: 'external',
      url: 'https://website-shop-dara.vercel.app/',
    },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('beranda')}
            className="flex items-center space-x-2"
          >
            <img
              src="https://z-cdn-media.chatglm.cn/files/0d96fa0f-e061-4b85-83e9-84c71897c7f9.jpeg"
              alt="DARA Logo"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-xl font-bold text-gray-900">DARA</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) =>
              item.type === 'external' ? (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-green-600 hover:text-green-700"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium ${
                    activeSection === item.id
                      ? 'text-black'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              )
            )}
          </div>

          {/* WhatsApp */}
          <div className="hidden md:block">
            <Button
              onClick={handleWhatsAppClick}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t mt-2">
            {menuItems.map((item, index) =>
              item.type === 'external' ? (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 font-medium text-green-600"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-3 text-gray-700"
                >
                  {item.label}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
