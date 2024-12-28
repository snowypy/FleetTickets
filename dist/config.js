"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketChannelId = exports.staffRoleId = exports.guildId = exports.token = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.token = process.env.TOKEN;
exports.guildId = process.env.GUILD_ID;
exports.staffRoleId = process.env.STAFF_ROLE_ID;
exports.ticketChannelId = process.env.TICKET_CHANNEL_ID;
