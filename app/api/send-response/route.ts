import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { response } = await request.json();

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'anyaegbufrancis34@gmail.com',
      subject: 'Valentine\'s Day Response',
      html: `
        <h2>Valentine's Day Response</h2>
        <p><strong>Response:</strong> ${response === 'yes' ? 'Yes 💕' : 'Maybe next time 😊'}</p>
        <p>Timestamp: ${new Date().toLocaleString()}</p>
      `,
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}
