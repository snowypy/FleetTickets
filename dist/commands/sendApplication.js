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
exports.sendApplicationCommand = void 0;
const discord_js_1 = require("discord.js");
const sendApplicationCommand = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle('Staff Application')
        .setDescription('Please fill out the following form to apply for a staff position.')
        .setColor('#FFD1DC')
        .setFooter({ text: 'Sea Cat Scallywags', iconURL: ((_a = interaction.client.user) === null || _a === void 0 ? void 0 : _a.avatarURL()) || '' })
        .setTimestamp();
    yield interaction.reply({ embeds: [embed], ephemeral: true });
    const modal = new discord_js_1.ModalBuilder()
        .setCustomId('staffApplicationModal')
        .setTitle('Staff Application Form');
    const whyInput = new discord_js_1.TextInputBuilder()
        .setCustomId('whyInput')
        .setLabel('Why do you wish to be staff?')
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setRequired(true);
    const vouchInput = new discord_js_1.TextInputBuilder()
        .setCustomId('vouchInput')
        .setLabel('Can any Current Staff Vouch for you?')
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setRequired(true);
    const experienceInput = new discord_js_1.TextInputBuilder()
        .setCustomId('experienceInput')
        .setLabel('Have you previously been a staff member here or on any other server? Please list any relevant life experience.')
        .setStyle(discord_js_1.TextInputStyle.Paragraph)
        .setRequired(true);
    const importantsInput = new discord_js_1.TextInputBuilder()
        .setCustomId('importantsInput')
        .setLabel('What is your Age? Time Zone? What console do you play on?')
        .setStyle(discord_js_1.TextInputStyle.Paragraph)
        .setRequired(true);
    const extrasInput = new discord_js_1.TextInputBuilder()
        .setCustomId('extrasInput')
        .setLabel('Anything else you would like to add?')
        .setStyle(discord_js_1.TextInputStyle.Paragraph)
        .setRequired(false);
    const firstActionRow = new discord_js_1.ActionRowBuilder().addComponents(whyInput);
    const secondActionRow = new discord_js_1.ActionRowBuilder().addComponents(vouchInput);
    const thirdActionRow = new discord_js_1.ActionRowBuilder().addComponents(experienceInput);
    const fourthActionRow = new discord_js_1.ActionRowBuilder().addComponents(importantsInput);
    const fifthActionRow = new discord_js_1.ActionRowBuilder().addComponents(extrasInput);
    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);
    yield interaction.showModal(modal);
});
exports.sendApplicationCommand = sendApplicationCommand;
