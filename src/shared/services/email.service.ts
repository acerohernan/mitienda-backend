import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import { Tenant } from '../../tenant/entities/tenant.entity';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private config: ConfigService) {
    this.transporter = this.createTransporter();
  }

  async sendEmail(params: {
    to: string;
    subject: string;
    html: string;
  }): Promise<{ information: any }> {
    const { to, subject, html } = params;

    const information = await this.transporter.sendMail({
      from: this.config.get('MAILER_FROM'),
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
    const subject = 'Restore Password (not-reply)';
    const html = `<span>Hi ${
      tenant.name || ''
    }, this is the link to restore your password <a  href="http://localhost:3000/tenant/auth/password/verify-code/${code}" target="_blank">http://localhost:3000/tenant/auth/password/verify-code/${code}</a></span>`;

    await this.sendEmail({ to: tenant.email, subject, html });
  }

  private createTransporter(): nodemailer.Transporter {
    return nodemailer.createTransport({
      host: this.config.get('MAILER_HOST'),
      port: this.config.get('MAILER_PORT'),
      auth: {
        user: this.config.get('MAILER_USER'),
        pass: this.config.get('MAILER_PASS'),
      },
    });
  }
}
