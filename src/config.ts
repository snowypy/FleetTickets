import dotenv from 'dotenv';
dotenv.config();

export const token = process.env.TOKEN!;
export const guildId = process.env.GUILD_ID!;
export const staffRoleId = process.env.STAFF_ROLE_ID!;
export const ticketChannelId = process.env.TICKET_CHANNEL_ID!;
