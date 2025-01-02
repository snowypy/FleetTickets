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
exports.handleInteraction = void 0;
const discord_js_1 = require("discord.js");
const close_1 = require("./commands/close");
const closeRequest_1 = require("./commands/closeRequest");
const create_panel_1 = require("./commands/create-panel");
const sendApplication_1 = require("./commands/sendApplication");
const handleInteraction = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (interaction.isButton()) {
        if (interaction.id === 'openApplicationModal') {
            const modal = new discord_js_1.ModalBuilder()
                .setCustomId('staffApplicationModal')
                .setTitle('Staff Application Form');
            const whyInput = new discord_js_1.TextInputBuilder()
                .setCustomId('whyInput')
                .setLabel('Why do you wish to be staff?')
                .setStyle(discord_js_1.TextInputStyle.Paragraph)
                .setRequired(true);
            const vouchInput = new discord_js_1.TextInputBuilder()
                .setCustomId('vouchInput')
                .setLabel('Can any Current Staff Vouch for you?')
                .setStyle(discord_js_1.TextInputStyle.Paragraph)
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
        }
    }
    else if (interaction.isCommand()) {
        if (interaction.commandName === 'create-panel') {
            yield (0, create_panel_1.createPanelCommand)(interaction);
        }
        else if (interaction.commandName === 'close') {
            yield (0, close_1.closeCommand)(interaction);
        }
        else if (interaction.commandName === 'close-request') {
            yield (0, closeRequest_1.closeRequestCommand)(interaction);
        }
        else if (interaction.commandName === 'send-application') {
            yield (0, sendApplication_1.sendApplicationCommand)(interaction);
        }
    }
    else if (interaction.isModalSubmit()) {
        if (interaction.customId === 'staffApplicationModal') {
            const why = interaction.fields.getTextInputValue('whyInput');
            const vouch = interaction.fields.getTextInputValue('vouchInput');
            const experience = interaction.fields.getTextInputValue('experienceInput');
            const importants = interaction.fields.getTextInputValue('importantsInput');
            const extras = interaction.fields.getTextInputValue('extrasInput');
            const applicationEmbed = new discord_js_1.EmbedBuilder()
                .setTitle(':white_check_mark: New Staff Application :white_check_mark:')
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
                .addFields({ name: 'Why do you wish to be staff?', value: why }, { name: 'Can any Current Staff Vouch for you?', value: vouch }, { name: 'Have you previously been a staff member here or on any other server? Please list any relevant life experience.', value: experience }, { name: 'What is your Age? Time Zone? What console do you play on?', value: importants }, { name: 'Anything else?', value: extras }, { name: 'Discord ID', value: interaction.user.id })
                .setThumbnail(interaction.user.displayAvatarURL())
                .setColor('#FFD1DC')
                .setFooter({ text: 'Sea Cat Scallywags', iconURL: ((_a = interaction.client.user) === null || _a === void 0 ? void 0 : _a.avatarURL()) || '' })
                .setTimestamp();
            const applicationChannel = (_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.channels.cache.get(`${process.env.APPLICATION_CHANNEL_ID}`);
            if (applicationChannel) {
                yield applicationChannel.send({ embeds: [applicationEmbed] });
            }
            yield interaction.reply({ content: 'Your application has been submitted!', ephemeral: true });
        }
    }
});
exports.handleInteraction = handleInteraction;
