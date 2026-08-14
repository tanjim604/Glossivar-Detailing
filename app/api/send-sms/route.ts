import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const recipientEmail = process.env.NOTIFICATION_EMAIL || 'your_email@gmail.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, service, details, estimatedPrice } = body;

    // Format service details
    let detailsText = '';
    if (service === 'auto') {
      detailsText = `${details.vehicleType.toUpperCase()} - ${
        details.autoScope === 'full' ? 'Full Detail' : 'Interior Only'
      }${details.hasPetHair ? ' (Includes Pet Hair)' : ''}`;
    } else {
      detailsText = `${details.boatLength}ft Boat Detail`;
    }

    // Send email alert via Resend
    await resend.emails.send({
      from: 'Glossiva Bookings <onboarding@resend.dev>',
      to: [recipientEmail],
      subject: `🚗 New Booking Request: ${name} ($${estimatedPrice})`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 500px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #eee; padding-bottom: 8px;">
            New Glossiva Booking Request
          </h2>
          <p><strong>Customer Name:</strong> ${name}</p>
          <p><strong>Phone Number:</strong> <a href="tel:${phone}">${phone}</a></p>
          <p><strong>Requested Service:</strong> ${detailsText}</p>
          <p style="font-size: 18px; font-weight: bold; color: #059669;">
            Estimated Total: $${estimatedPrice}
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888;">
            Submitted from your website quote calculator.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email via Resend:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}