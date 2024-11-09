import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prismaService';
import { Message } from '@prisma/client';
import { Twilio } from 'twilio';

@Injectable()
export class MessageService {
    private twilioClient: Twilio;

    constructor(private readonly prisma: PrismaService) {
       // this.twilioClient = new Twilio('apikey', 'apikey');
    }

    async insertMessage(body: Message): Promise<Message> {
        try {
            const savedMessage = await this.prisma.message.create({
                data: {
                    phoneNumber: body.phoneNumber,
                    text: body.text,
                    status: body.status,
                },
            });


            await this.twilioClient.messages.create({
                body: body.text,
                from: '+12674353951', 
                to: body.phoneNumber,
            });

            return savedMessage;
        } catch (error) {
            throw error;
        }
    }
}
