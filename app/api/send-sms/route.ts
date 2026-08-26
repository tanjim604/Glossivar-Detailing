import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const recipientEmail = process.env.NOTIFICATION_EMAIL || 'your_email@gmail.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, service, frequency, details, estimatedPrice } = body;

    // Map frequency keys to clear labels
    const frequencyLabels: Record<string, string> = {
      one_time: 'One-Time Service',
      monthly: 'Monthly (Recurring)',
      '3_months': 'Every 3 Months (Recurring)',
      '6_months': 'Every 6 Months (Recurring)',
    };
    const formattedFrequency = frequencyLabels[frequency] || 'One-Time Service';

    // Format service details string
    let detailsText = '';

    if (service === 'auto') {
      const vehicle = details?.vehicleType ? details.vehicleType.toUpperCase() : 'AUTO';
      const scope = details?.autoScope === 'full' ? 'Full Detail' : 'Interior Only';
      const pet = details?.hasPetHair ? ' (Includes Pet Hair)' : '';
      detailsText = `${vehicle} - ${scope}${pet}`;
    } else if (service === 'maintenance') {
      const selectedList = Array.isArray(details?.selectedServices) && details.selectedServices.length > 0
        ? details.selectedServices.join(', ')
        : 'Custom Maintenance Package';
      detailsText = `Maintenance Bundle (${selectedList})`;
    } else if (service === 'boat') {
      const length = details?.boatLength || 15;
      detailsText = `${length}ft Boat Detail`;
    } else {
      detailsText = 'General Detailing Request';
    }

    const subjectEmoji = service === 'boat' ? '⚓' : service === 'maintenance' ? '🛠️' : '🚗';

    // Send email alert via Resend
    await resend.emails.send({
      from: 'Glossiva Bookings <onboarding@resend.dev>',
      to: [recipientEmail],
      subject: `${subjectEmoji} New Booking Request: ${name} ($${estimatedPrice})`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 500px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #eee; padding-bottom: 8px;">
            New Glossiva Booking Request
          </h2>
          <p><strong>Customer Name:</strong> ${name}</p>
          <p><strong>Phone Number:</strong> <a href="tel:${phone}">${phone}</a></p>
          <p><strong>Requested Service:</strong> ${detailsText}</p>
          <p><strong>Service Frequency:</strong> ${formattedFrequency}</p>
          <p style="font-size: 18px; font-weight: bold; color: #059669;">
            Estimated Total: $${estimatedPrice} CAD ${frequency !== 'one_time' ? '/ visit' : ''}
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