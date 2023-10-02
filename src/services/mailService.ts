import { SendMailOptions, Transporter, createTransport } from "nodemailer";
import * as aws from "@aws-sdk/client-ses";
import { SES, SESClientConfig } from "@aws-sdk/client-ses";

export class MailService {
    private _transport?: Transporter;

    async connect(MailClientConfig: any) {
        this._transport = createTransport(MailClientConfig);
        await this._transport.verify();
    }

    async amazonConnect(SesConfig: SESClientConfig) {
        const sesClient = new SES(SesConfig);
        this._transport = createTransport({ SES: { ses: sesClient, aws } });
        await this._transport.verify();
    }

    disconnect(): void {
        if (!this._transport) throw new Error('Cannot access Mail service before Connecting');
        this._transport.close();
    }

    async sendmail(mailOptions: SendMailOptions): Promise<void> {
        if (!this._transport) throw new Error('Cannot access Mail service before Connecting');
        await this._transport?.sendMail(mailOptions);
    }
}