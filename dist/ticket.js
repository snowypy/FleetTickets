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
const handleInteraction = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    if (interaction.isSelectMenu()) {
        const category = interaction.values[0];
        const userIssue = yield interaction.user.send('Please describe your issue:');
        const filter = (m) => m.author.id === interaction.user.id;
        const collector = (_a = interaction.user.dmChannel) === null || _a === void 0 ? void 0 : _a.createMessageCollector({ filter, time: 15000 });
        if (!collector) {
            return;
        }
        collector.on('collect', (m) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const ticketChannel = yield ((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.channels.create({
                name: `ticket-${interaction.user.username}`,
                type: discord_js_1.ChannelType.GuildText,
                parent: category,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ['ViewChannel'],
                    },
                    {
                        id: interaction.user.id,
                        allow: ['ViewChannel'],
                    },
                    {
                        id: config_1.staffRoleId,
                        allow: ['ViewChannel'],
                    },
                ],
            }));
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle(`Ticket created by ${interaction.user.username}`)
                .setDescription(`Issue: ${m.content}`)
                .setColor('#0099ff');
            if (!ticketChannel) {
                return;
            }
            if (ticketChannel instanceof discord_js_1.TextChannel) {
                yield ticketChannel.send({ embeds: [embed] });
                yield ticketChannel.send(`Staff, please claim this ticket by reacting with ✅`);
            }
            else {
                console.error('Channel type does not support sending messages.');
            }
            collector.stop();
        }));
    }
    else if (interaction.isButton()) {
        if (interaction.customId === 'create-panel') {
            const category = yield ((_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.channels.cache.find(channel => channel.type === discord_js_1.ChannelType.GuildCategory && channel.name === 'Tickets'));
            if (!category) {
                return;
            }
            const selectMenu = {
                type: 1,
                components: [
                    {
                        type: 3,
                        customId: 'ticket-select-menu',
                        options: [
                            {
                                label: 'General Support',
                                value: category.id,
                            },
                        ],
                    },
                ],
            };
            yield interaction.reply({ content: 'Please select a category for your ticket.', fetchReply: true, ephemeral: true });
            if (interaction.channel instanceof discord_js_1.TextChannel) {
                interaction.channel.send({
                    content: 'Create a ticket',
                    components: [selectMenu],
                });
            }
            else {
                console.error('Channel type does not support sending messages.');
            }
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
                        .setTitle('Welcome to Sea Cats Support!')
                        .setDescription('Thank you for creating a ticket. A member of the Staff team will respond as soon as possible.\nPlease be as specific as possible when describing your issue.')
                        .setColor('#FFD1DC')
                        .setFooter({ text: 'Sea Cats', iconURL: ((_c = interaction.client.user) === null || _c === void 0 ? void 0 : _c.avatarURL()) || '' });
                    yield thread.send({ embeds: [welcomeEmbed] });
                    yield thread.members.add(interaction.user.id);
                    console.log('Private thread created successfully.');
                }
                else {
                    console.error('Failed to create private thread.');
                }
            }
            catch (error) {
                console.error('Error creating private thread:', error);
            }
        }
    }
    else if (interaction.isCommand()) {
        if (interaction.commandName === 'create-panel') {
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle('Create a Ticket')
                .setDescription('Click the button below to create a ticket.')
                .setColor('#FFD1DC')
                .setFooter({ text: 'Sea Cat Scallywags', iconURL: ((_d = interaction.client.user) === null || _d === void 0 ? void 0 : _d.avatarURL()) || '' });
            yield interaction.reply({ content: 'The panel has been sent to the channel.', fetchReply: true, ephemeral: true });
            if (interaction.channel instanceof discord_js_1.TextChannel) {
                interaction.channel.send({
                    embeds: [embed],
                    components: [
                        {
                            type: 1,
                            components: [
                                {
                                    type: 2,
                                    label: 'Create Ticket',
                                    style: 1,
                                    customId: 'create-ticket-button',
                                },
                            ],
                        },
                    ],
                });
            }
            else {
                console.error('Channel type does not support sending messages.');
            }
        }
        else if (interaction.commandName === 'close') {
            yield (0, close_1.closeCommand)(interaction);
        }
        else if (interaction.commandName === 'close-request') {
            yield (0, closeRequest_1.closeRequestCommand)(interaction);
        }
    }
});
exports.handleInteraction = handleInteraction;
