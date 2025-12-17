import { NextRequest, NextResponse } from 'next/server';

// Data produk (dalam aplikasi nyata, ini akan berasal dari database)
const products = [
  {
    id: 'dara-classic',
    name: 'DARA Classic',
    price: 149000,
    description: 'Kaos klasik dengan desain timeless',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
    badge: 'Best Seller',
    category: 'classic',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Hitam', 'Putih', 'Abu-abu'],
    material: '100% Cotton Combed 30s'
  },
  {
    id: 'dara-premium',
    name: 'DARA Premium',
    price: 189000,
    description: 'Kualitas premium dengan bahan terbaik',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop',
    badge: 'Premium',
    category: 'premium',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'Hitam', 'Putih', 'Maroon'],
    material: '100% Cotton Combed 24s'
  },
  {
    id: 'dara-sport',
    name: 'DARA Sport',
    price: 169000,
    description: 'Nyaman untuk aktivitas outdoor',
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=600&fit=crop',
    badge: 'Sport Series',
    category: 'sport',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Hitam', 'Navy', 'Abu-abu'],
    material: 'Polyester Cotton Blend'
  },
  {
    id: 'dara-essential',
    name: 'DARA Essential',
    price: 129000,
    description: 'Pilihan tepat untuk sehari-hari',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop',
    badge: 'Essential',
    category: 'essential',
    sizes: ['S', 'M', 'L'],
    colors: ['Putih', 'Hitam', 'Abu-abu'],
    material: '100% Cotton Combed 30s'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const id = searchParams.get('id');
    
    // Jika ada parameter id, kembalikan produk spesifik
    if (id) {
      const product = products.find(p => p.id === id);
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: product
      });
    }
    
    // Jika ada parameter category, filter berdasarkan kategori
    let filteredProducts = products;
    if (category) {
      filteredProducts = products.filter(p => p.category === category);
    }
    
    return NextResponse.json({
      success: true,
      data: filteredProducts,
      total: filteredProducts.length
    });
    
  } catch (error) {
    console.error('Products API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch products' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Dalam aplikasi nyata, ini akan menyimpan ke database
    // Untuk sekarang, kita hanya return success response
    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      data: body
    });
    
  } catch (error) {
    console.error('Products POST API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create product' 
      },
      { status: 500 }
    );
  }
}