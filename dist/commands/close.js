"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeCommand = void 0;
const discord_js_1 = require("discord.js");
const config_1 = require("../config");
const closeCommand = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if (interaction.channel && interaction.channel.isThread()) {
        yield interaction.channel.setLocked(true);
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle(':lock: Ticket Closed :lock:')
            .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() })
            .setDescription(`<@${interaction.user.id}> has closed this ticket. You can no longer reply to this ticket unless it is reopened by a staff member.\n\n**You have been DMd a link to your transcript for future reference.**`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter({ text: 'Sea Cat Scallywags', iconURL: ((_a = interaction.client.user) === null || _a === void 0 ? void 0 : _a.avatarURL()) || '' });
        yield interaction.reply({ embeds: [embed], components: [] });
        const channelName = interaction.channel.name;
        const username = channelName.split('-')[1];
        const user = (_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.members.cache.find(member => member.user.username === username);
        if (user) {
            const dmEmbed = new discord_js_1.EmbedBuilder()
                .setTitle('Ticket Closed')
                .setDescription(`Your ticket <#${interaction.channelId}> has been closed by <@${interaction.user.id}>. If you need assistance again, please create a new ticket by clicking the button below.\n\n<#${config_1.ticketChannelId}>`)
                .setColor('#FF0000')
                .setTimestamp()
                .setFooter({ text: 'Sea Cat Scallywags', iconURL: ((_c = interaction.client.user) === null || _c === void 0 ? void 0 : _c.avatarURL()) || '' });
            yield user.send({ embeds: [dmEmbed] });
        }
    }
});
exports.closeCommand = closeCommand;
