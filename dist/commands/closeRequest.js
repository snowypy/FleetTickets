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
exports.closeRequestCommand = void 0;
const discord_js_1 = require("discord.js");
const closeRequestCommand = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if (((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.type) === discord_js_1.ChannelType.PrivateThread && interaction.channel.name.startsWith('support-')) {
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle(':clipboard: Close Ticket Request :clipboard:')
            .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() })
            .setDescription(`<@${interaction.user.id}> has requested to close this ticket.\n\nAre you sure you want to close this ticket?`)
            .setColor('#FFD1DC')
            .setTimestamp()
            .setFooter({ text: 'Sea Cat Scallywags', iconURL: ((_b = interaction.client.user) === null || _b === void 0 ? void 0 : _b.avatarURL()) || '' });
        const acceptButton = new discord_js_1.ButtonBuilder()
            .setCustomId('accept-close')
            .setEmoji('✅')
            .setLabel('Accept and Close')
            .setStyle(discord_js_1.ButtonStyle.Success);
        const declineButton = new discord_js_1.ButtonBuilder()
            .setCustomId('decline-close')
            .setEmoji('❌')
            .setLabel('Decline Closure')
            .setStyle(discord_js_1.ButtonStyle.Danger);
        const actionRow = new discord_js_1.ActionRowBuilder().addComponents(acceptButton, declineButton);
        yield interaction.reply({ embeds: [embed], components: [actionRow], ephemeral: false });
    }
    else {
        const errorEmbed = new discord_js_1.EmbedBuilder()
            .setTitle(':x: Error :x:')
            .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() })
            .setDescription('This command can only be used in tickets.\n\nIs this a ticket? If so contact <@721017166652244018>')
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter({ text: 'Sea Cat Scallywags', iconURL: ((_c = interaction.client.user) === null || _c === void 0 ? void 0 : _c.avatarURL()) || '' });
        yield interaction.reply({ embeds: [errorEmbed], ephemeral: false });
    }
});
exports.closeRequestCommand = closeRequestCommand;
