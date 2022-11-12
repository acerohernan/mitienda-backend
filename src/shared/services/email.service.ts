import nodemailer from 'nodemailer';
import { Tenant } from '../../tenant/entities/tenant.entity';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = this.createTransporter();
  }

  async sendEmail(params: {
    to: string;
    subject: string;
    html: string;
  }): Promise<{ information: any }> {
    const { to, subject, html } = params;

    const information = await this.transporter.sendMail({
      from: '"MiTienda Soporte" <mitienda@no-reply.com>',
      to,
      subject,
      html,
    });

    return { information };
  }

  async sendForgotPasswordEmail({
    tenant,
    code,
  }: {
    tenant: Tenant;
    code: string;
  }) {
    const subject = 'Restore Password (not reply)';
    const html = `<span>Hi ${
      tenant.name || ''
    }, this is the link to restore your password <a  href="http://localhost:3000/tenant/auth/password/verify-code/${code}" target="_blank">http://localhost:3000/tenant/auth/password/verify-code/${code}</a></span>`;

    await this.sendEmail({ to: tenant.email, subject, html });
  }

  private createTransporter(): nodemailer.Transporter {
    return nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '8d8d3f2e66954f',
        pass: '6f2d220fd13404',
      },
    });
  }
}
