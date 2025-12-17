'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Check, MessageCircle, Package, Shirt, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ImageSlider from '@/components/ImageSlider';
import GoogleMap from '@/components/GoogleMap';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  // Data slider dengan gambar-gambar kaos DARA untuk hero section
  const heroSlides = [
    {
      id: 1,
      image: 'https://z-cdn-media.chatglm.cn/files/c52fd4cd-b10e-4a4c-a60a-9b8534e45031.png?auth_key=1865917188-57478f0a8594498481d396adedc90768-0-e6d0b3790e31b322e0b5d7f9000a5689',
      title: 'KAOS DARA',
      description: 'Koleksi kaos berkualitas dengan berbagai pilihan warna dan desain',
      showCTA: true
    },
    {
      id: 2,
      image: 'https://z-cdn-media.chatglm.cn/files/0e5765c6-7920-41e3-aee4-36d0fcdb5e2b.png?auth_key=1865917188-821deec65cc5427391afe4896765cb17-0-22ed52b361e06278ca5ded96120e380d',
      title: 'Three Tone Collection',
      description: 'Desain salur tiga warna yang unik dan stylish',
      showCTA: true
    },
    {
      id: 3,
      image: 'https://z-cdn-media.chatglm.cn/files/be42459a-9375-41fa-91eb-2655baf93278.png?auth_key=1865917188-f8408b1890d34335bfb0b52b4020da51-0-0ca121fd93ec390bdc793fe2c7e24b10',
      title: 'Promo 12.12',
      description: 'Penawaran spesial untuk koleksi kaos DARA favorit Anda',
      showCTA: true
    }
  ];

  const products = [
    {
      id: 'dara-classic',
      name: 'DARA Classic',
      price: 'Rp 149.000',
      description: 'Kaos klasik dengan desain timeless',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
      badge: 'Best Seller'
    },
    {
      id: 'dara-premium',
      name: 'DARA Premium',
      price: 'Rp 189.000',
      description: 'Kualitas premium dengan bahan terbaik',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop',
      badge: 'Premium'
    },
    {
      id: 'dara-sport',
      name: 'DARA Sport',
      price: 'Rp 169.000',
      description: 'Nyaman untuk aktivitas outdoor',
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=600&fit=crop',
      badge: 'Sport Series'
    },
    {
      id: 'dara-essential',
      name: 'DARA Essential',
      price: 'Rp 129.000',
      description: 'Pilihan tepat untuk sehari-hari',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop',
      badge: 'Essential'
    }
  ];

  const testimonials = [
    {
      name: 'Andi Pratama',
      message: 'Kualitas kaos DARA memang top! Bahannya nyaman dan modelnya simpel tapi tetap berkarakter.',
      rating: 5
    },
    {
      name: 'Sarah Wijaya',
      message: 'Sudah beli 3 kaos DARA, semuanya awet dan warnanya tidak mudah pudar. Recommended!',
      rating: 5
    },
    {
      name: 'Budi Santoso',
      message: 'Pelayanannya bagus dan kaosnya sesuai ekspektasi. Worth it untuk harga segini.',
      rating: 5
    }
  ];

  const advantages = [
    {
      icon: <Shirt className="w-8 h-8" />,
      title: 'Bahan Premium',
      description: '100% Cotton Combed berkualitas tinggi'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Nyaman Dipakai',
      description: 'Tidak panas dan menyerap keringat'
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: 'Jahitan Rapi',
      description: 'Dibuat dengan standar kualitas tinggi'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Desain Modern',
      description: 'Simple namun tetap stylish dan berkarakter'
    }
  ];

  // Data lokasi toko DARA dengan URL Google Maps yang lebih sederhana dan stabil
  const mapLocation = {
    url: 'https://www.google.com/maps/@-7.0248218,107.528482,17z/data=!3m1!4b1!4m2!3m3!1m2!1s0x673b6b8c9f8a8!2s0?entry=ttu',
    title: 'Toko Kaos DARA',
    description: 'Kunjungi toko kami untuk melihat koleksi lengkap kaos DARA'
  };

  const handleWhatsAppOrder = (productName?: string) => {
    const baseMessage = "Halo Admin DARA, saya tertarik dengan produk kaos DARA.\nMohon informasi harga, stok, dan ukuran yang tersedia.\nTerima kasih.";
    
    const message = productName 
      ? `Halo Admin DARA, saya tertarik dengan produk kaos ${productName}.\nMohon informasi harga, stok, dan ukuran yang tersedia.\nTerima kasih.`
      : baseMessage;
    
    const whatsappUrl = `https://wa.me/6285624209964?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Slider Section */}
      <section id="beranda" className="relative h-screen pt-16">
        <ImageSlider 
          slides={heroSlides}
          autoPlay={true}
          interval={4000}
          showHeroCTA={true}
          onWhatsAppClick={() => handleWhatsAppOrder()}
        />
      </section>

      {/* Highlight Produk Unggulan */}
      <section id="produk" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Koleksi Terbaik</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Produk Unggulan DARA
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pilihan kaos terbaik kami dengan kualitas premium dan desain yang timeless
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-black text-white">
                    {product.badge}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                  </div>
                  <Button 
                    className="w-full bg-black text-white hover:bg-gray-800"
                    onClick={() => handleWhatsAppOrder(product.name)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Pesan via WhatsApp
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tentang Brand DARA */}
      <section id="tentang" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">Tentang Kami</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Cerita DARA
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                  alt="DARA Brand"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Simple Wear, Strong Identity
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  DARA lahir dari keyakinan bahwa kesederhanaan adalah kekuatan. 
                  Kami percaya bahwa setiap individu memiliki karakter unik yang 
                  seharusnya diungkapkan dengan cara yang sederhana namun berkesan.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Setiap kaos DARA dirancang dengan filosofi "less is more" - 
                  menghilangkan yang tidak perlu dan fokus pada esensi desain 
                  yang benar-benar penting. Hasilnya adalah pakaian yang tidak 
                  hanya nyaman dipakai, tetapi juga mampu mengekspresikan 
                  kepribadian pemakainya.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Komitmen kami terhadap kualitas tidak hanya pada desain, 
                  tetapi juga pada pemilihan bahan terbaik dan proses produksi 
                  yang teliti. Karena kami percaya bahwa kualitas adalah 
                  investasi jangka panjang untuk gaya hidup yang lebih baik.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keunggulan Produk */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Mengapa DARA?</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Keunggulan Produk DARA
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Alasan mengapa kaos DARA menjadi pilihan tepat untuk gaya hidup modern
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4 text-black">
                  {advantage.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {advantage.title}
                </h3>
                <p className="text-gray-600">
                  {advantage.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimoni Pelanggan */}
      <section id="testimoni" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Shop DARA</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Apa Kata Pelanggan Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kepuasan pelanggan adalah prioritas utama kami
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.message}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">Pelanggan DARA</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action WhatsApp */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Siap Tampil Simpel dan Berkarakter Bersama DARA?
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Temukan koleksi kaos premium yang sesuai dengan gaya hidup Anda. 
              Pesan sekarang dan dapatkan penawaran spesial!
            </p>
            <Button 
              size="lg"
              className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg flex items-center gap-2 mx-auto"
              onClick={() => handleWhatsAppOrder()}
            >
              <MessageCircle className="w-6 h-6" />
              Pesan Sekarang via WhatsApp
            </Button>
            <p className="mt-4 text-gray-400">
              Gratis konsultasi produk • Pengiriman cepat • Garansi kepuasan
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center md:items-start lg:col-span-1">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4">
                <img 
                  src="https://z-cdn-media.chatglm.cn/files/0d96fa0f-e061-4b85-83e9-84c71897c7f9.jpeg?auth_key=1865841865-4eed4ec02877462e82094006c8904964-0-68816be4bf5005e1583772fa0ae631c7"
                  alt="DARA Logo"
                  className="h-8 sm:h-10 md:h-12 w-auto object-contain"
                />
                <h3 className="text-xl sm:text-2xl font-bold">DARA</h3>
              </div>
              <p className="text-gray-400 text-center md:text-left">
                Simple Wear, Strong Identity
              </p>
            </div>
            
            {/* Map Section */}
            <div className="lg:col-span-2">
              <h4 className="text-lg font-semibold mb-4">Lokasi Kami</h4>
              <GoogleMap 
                mapUrl={mapLocation.url}
                title={mapLocation.title}
                description={mapLocation.description}
                className="w-full"
              />
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Kontak</h4>
              <p className="text-gray-400 mb-2">WhatsApp: +62 856-2420-9964</p>
              <p className="text-gray-400 mb-2">Email: hello@darawear.com</p>
              <p className="text-gray-400">Jam Operasional: 09:00 - 21:00 WIB</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Layanan</h4>
              <ul className="text-gray-400 space-y-2">
                <li>Pengiriman Nasional</li>
                <li>Garansi Produk</li>
                <li>Custom Design</li>
                <li>Reseller Welcome</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DARA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}