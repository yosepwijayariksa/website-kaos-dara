import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { productName, customerName, message } = await request.json();
    
    // Nomor WhatsApp tujuan
    const businessWhatsApp = '6285624209964';
    
    // Format pesan WhatsApp
    let whatsappMessage = '';
    
    if (productName) {
      whatsappMessage = `Halo Admin DARA, saya tertarik dengan produk kaos ${productName}.\n` +
        `Mohon informasi harga, stok, dan ukuran yang tersedia.\n` +
        `${customerName ? `Nama: ${customerName}\n` : ''}` +
        `${message ? `Pesan tambahan: ${message}\n` : ''}` +
        `Terima kasih.`;
    } else {
      whatsappMessage = `Halo Admin DARA, saya tertarik dengan produk kaos DARA.\n` +
        `Mohon informasi harga, stok, dan ukuran yang tersedia.\n` +
        `${customerName ? `Nama: ${customerName}\n` : ''}` +
        `${message ? `Pesan tambahan: ${message}\n` : ''}` +
        `Terima kasih.`;
    }
    
    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Generate WhatsApp URL
    const whatsappUrl = `https://wa.me/${businessWhatsApp}?text=${encodedMessage}`;
    
    return NextResponse.json({
      success: true,
      whatsappUrl,
      message: 'WhatsApp URL generated successfully'
    });
    
  } catch (error) {
    console.error('WhatsApp API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate WhatsApp URL' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'WhatsApp API endpoint is working',
    usage: 'POST /api/whatsapp with { productName?, customerName?, message? }'
  });
}