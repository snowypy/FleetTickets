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
        .setDescription('Click the button below to apply for a staff position.')
        .setColor('#FFD1DC')
        .setFooter({ text: 'Sea Cat Scallywags', iconURL: ((_a = interaction.client.user) === null || _a === void 0 ? void 0 : _a.avatarURL()) || '' })
        .setTimestamp();
    const button = new discord_js_1.ButtonBuilder()
        .setCustomId('openApplicationModal')
        .setLabel('Apply Now')
        .setStyle(discord_js_1.ButtonStyle.Primary);
    const buttonRow = new discord_js_1.ActionRowBuilder().addComponents(button);
    yield interaction.reply({ embeds: [embed], components: [buttonRow], ephemeral: false });
});
exports.sendApplicationCommand = sendApplicationCommand;
