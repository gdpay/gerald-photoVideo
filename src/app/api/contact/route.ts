import { NextResponse } from 'next/server';
import { z } from 'zod';
import { SITE } from '@/lib/constants';

// In production, uncomment and configure:
// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  serviceType: z.enum(['photography', 'videography', 'both']),
  eventType: z.enum(['wedding', 'quinceanera', 'engagement', 'other']),
  eventDate: z.string().min(1, 'Event date is required'),
  guestCount: z.string().optional(),
  venue: z.string().optional(),
  name: z.string().min(2, 'Name is required'),
  partnerName: z.string().optional(),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone is required'),
  hearAbout: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().max(0, 'Bot detected').optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // Store lead in Sanity CMS
    // const lead = await client.create({
    //   _type: 'lead',
    //   name: data.name,
    //   email: data.email,
    //   phone: data.phone,
    //   serviceType: data.serviceType,
    //   eventType: data.eventType,
    //   eventDate: data.eventDate,
    //   guestCount: data.guestCount,
    //   venue: data.venue,
    //   partnerName: data.partnerName,
    //   hearAbout: data.hearAbout,
    //   message: data.message,
    //   createdAt: new Date().toISOString(),
    // });

    // Send notification email via Resend
    // await resend.emails.send({
    //   from: `Gerald Photo Video <${process.env.CONTACT_EMAIL_FROM || 'noreply@geraldphotovideo.com'}>`,
    //   to: process.env.CONTACT_EMAIL_TO || 'info@geraldphotovideo.com',
    //   subject: `New Inquiry: ${data.eventType} — ${data.name}`,
    //   html: `
    //     <h2>New Lead Generated</h2>
    //     <table style="width:100%;border-collapse:collapse;">
    //       ${Object.entries({
    //         Service: `${data.serviceType} — ${data.eventType}`,
    //         'Event Date': data.eventDate,
    //         'Guest Count': data.guestCount || 'N/A',
    //         Venue: data.venue || 'N/A',
    //         Name: data.name,
    //         Partner: data.partnerName || 'N/A',
    //         Email: data.email,
    //         Phone: data.phone,
    //         'Heard Via': data.hearAbout || 'N/A',
    //         Message: data.message || 'N/A',
    //       }).map(([key, val]) => `
    //         <tr>
    //           <td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;color:#333;width:120px;">${key}</td>
    //           <td style="padding:8px;border-bottom:1px solid #eee;color:#555;">${val}</td>
    //         </tr>
    //       `).join('')}
    //     </table>
    //   `,
    // });

    // Send auto-reply to lead
    // await resend.emails.send({
    //   from: `Gerald Photo Video <${process.env.CONTACT_EMAIL_FROM || 'noreply@geraldphotovideo.com'}>`,
    //   to: data.email,
    //   subject: 'Thank you for reaching out — Gerald Photo Video',
    //   html: `
    //     <h2>Thank you, ${data.name}!</h2>
    //     <p>We've received your inquiry and will get back to you within 24 hours.</p>
    //     <p>In the meantime, feel free to browse our portfolio:</p>
    //     <p><a href="https://www.geraldphotovideo.com/portfolio">View Our Portfolio →</a></p>
    //     <p>— The Gerald Photo Video Team</p>
    //   `,
    // });

    console.log('New lead received:', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.serviceType,
      event: data.eventType,
      date: data.eventDate,
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out! We will get back to you within 24 hours.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 422 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}
