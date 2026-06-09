import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { fullName, email, message } = await req.json();

    await resend.emails.send({
      // bisa diganti sesuai kebutuhan, pastikan domain sudah terverifikasi di Resend
      from: "Contact Portfolio Najwa Kurnia <onboarding@resend.dev>",
      to: "kurnianajwa8@gmail.com",
      subject: `New message from ${fullName}`,
      html: `
        <h3><bold>From: </bold> ${fullName} </h3>
        <h4><bold>${email}</bold></h4>
        <p>${message}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { success: false, error },
      { status: 500 }
    );
  }
}