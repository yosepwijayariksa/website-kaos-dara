import { NextRequest, NextResponse } from 'next/server';

// Data testimoni (dalam aplikasi nyata, ini akan berasal dari database)
const testimonials = [
  {
    id: 1,
    name: 'Andi Pratama',
    message: 'Kualitas kaos DARA memang top! Bahannya nyaman dan modelnya simpel tapi tetap berkarakter.',
    rating: 5,
    date: '2024-01-15',
    verified: true
  },
  {
    id: 2,
    name: 'Sarah Wijaya',
    message: 'Sudah beli 3 kaos DARA, semuanya awet dan warnanya tidak mudah pudar. Recommended!',
    rating: 5,
    date: '2024-01-10',
    verified: true
  },
  {
    id: 3,
    name: 'Budi Santoso',
    message: 'Pelayanannya bagus dan kaosnya sesuai ekspektasi. Worth it untuk harga segini.',
    rating: 5,
    date: '2024-01-05',
    verified: true
  },
  {
    id: 4,
    name: 'Maya Putri',
    message: 'Desainnya minimalis tapi elegan. Suka banget sama bahannya yang adem dipakai sehari-hari.',
    rating: 5,
    date: '2023-12-28',
    verified: true
  },
  {
    id: 5,
    name: 'Rizky Firmansyah',
    message: 'Kaos DARA jadi pilihan utama saya sekarang. Kualitasnya sebanding dengan harganya.',
    rating: 5,
    date: '2023-12-20',
    verified: true
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const rating = searchParams.get('rating');
    
    let filteredTestimonials = testimonials;
    
    // Filter berdasarkan rating
    if (rating) {
      filteredTestimonials = testimonials.filter(t => t.rating === parseInt(rating));
    }
    
    // Batasi jumlah hasil
    if (limit) {
      filteredTestimonials = filteredTestimonials.slice(0, parseInt(limit));
    }
    
    // Acak urutan untuk tampilan yang lebih natural
    const shuffled = [...filteredTestimonials].sort(() => 0.5 - Math.random());
    
    return NextResponse.json({
      success: true,
      data: shuffled,
      total: testimonials.length
    });
    
  } catch (error) {
    console.error('Testimonials API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch testimonials' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, message, rating } = body;
    
    // Validasi input
    if (!name || !message || !rating) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Name, message, and rating are required' 
        },
        { status: 400 }
      );
    }
    
    // Dalam aplikasi nyata, ini akan menyimpan ke database
    const newTestimonial = {
      id: testimonials.length + 1,
      name,
      message,
      rating: parseInt(rating),
      date: new Date().toISOString().split('T')[0],
      verified: false // Perlu verifikasi admin
    };
    
    return NextResponse.json({
      success: true,
      message: 'Testimonial submitted successfully. It will be visible after verification.',
      data: newTestimonial
    });
    
  } catch (error) {
    console.error('Testimonials POST API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to submit testimonial' 
      },
      { status: 500 }
    );
  }
}