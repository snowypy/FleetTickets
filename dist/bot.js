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
const config_1 = require("./config");
const close_1 = require("./commands/close");
const closeRequest_1 = require("./commands/closeRequest");
const create_panel_1 = require("./commands/create-panel");
const sendApplication_1 = require("./commands/sendApplication");
const handleInteraction = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    if (interaction.isButton()) {
        if (interaction.customId === 'create-panel') {
        }
        else if (interaction.customId === 'create-ticket-button') {
            try {
                const channelId = interaction.channelId;
                if (!interaction.channel) {
                    return;
                }
                const thread = yield interaction.channel.threads.create({
                    name: `support-${interaction.user.username}`,
                    autoArchiveDuration: 60,
                    type: discord_js_1.ChannelType.PrivateThread,
                    reason: `Created by <@${interaction.user.id}>`,
                });
                if (thread) {
                    const welcomeEmbed = new discord_js_1.EmbedBuilder()
                        .setTitle(':wave: Welcome to Sea Cats Support! :wave:')
                        .setDescription('Thanks for making a ticket. A member of our team will be with you ASAP.\n\n**Please be clear when describing your issue.**')
                        .setColor('#FFD1DC')
                        .setThumbnail(((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.iconURL()) || '')
                        .setTimestamp()
                        .setFooter({ text: 'Sea Cat Scallywags', iconURL: ((_b = interaction.client.user) === null || _b === void 0 ? void 0 : _b.avatarURL()) || '' });
                    yield thread.send({ content: `<@&${config_1.staffRoleId}>`, embeds: [welcomeEmbed] });
                    yield thread.members.add(interaction.user.id);
                    const createdTicketEmbed = new discord_js_1.EmbedBuilder()
                        .setTitle(':white_check_mark: Ticket Created :white_check_mark:')
                        .setDescription(`Your ticket has been created. <#${thread.id}>\n\n**Please respect staff in your ticket to avoid a ticket suspension or blacklist.**`)
                        .setColor('#FFD1DC')
                        .setTimestamp()
                        .setFooter({ text: 'Sea Cat Scallywags', iconURL: ((_c = interaction.client.user) === null || _c === void 0 ? void 0 : _c.avatarURL()) || '' });
                    yield interaction.reply({
                        embeds: [createdTicketEmbed],
                        ephemeral: true,
                    });
                    console.log(`Created a new ticket: support-${interaction.user.username}`);
                }
                else {
                    console.error('Hit a snag creating a new ticket.');
                }
            }
            catch (error) {
                console.error('Hit a snag creating a new ticket.', error);
            }
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
                .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() })
                .addFields({ name: 'Why do you wish to be staff?', value: why }, { name: 'Can any Current Staff Vouch for you?', value: vouch }, { name: 'Have you previously been a staff member here or on any other server? Please list any relevant life experience.', value: experience }, { name: 'What is your Age? Time Zone? What console do you play on?', value: importants }, { name: 'Anything else?', value: extras })
                .setColor('#FFD1DC')
                .setFooter({ text: 'Sea Cat Scallywags', iconURL: ((_d = interaction.client.user) === null || _d === void 0 ? void 0 : _d.avatarURL()) || '' })
                .setTimestamp();
            const applicationChannel = (_e = interaction.guild) === null || _e === void 0 ? void 0 : _e.channels.cache.get(`${process.env.APPLICATION_CHANNEL_ID}`);
            if (applicationChannel) {
                yield applicationChannel.send({ embeds: [applicationEmbed] });
            }
            yield interaction.reply({ content: 'Your application has been submitted!', ephemeral: true });
        }
    }
});
exports.handleInteraction = handleInteraction;
