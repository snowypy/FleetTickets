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
const discord_js_1 = require("discord.js");
const config_1 = require("./config");
const bot_1 = require("./bot");
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const discord_js_2 = require("discord.js");
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages, discord_js_1.GatewayIntentBits.MessageContent] });
const pastelPink = '\x1b[38;2;255;209;220m';
const resetColor = '\x1b[0m';
function pastel(message) {
    console.log(`${pastelPink}${message}${resetColor}`);
}
client.once('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    pastel(`Started Tickets as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}!`);
    try {
        pastel('Refreshing application slash commands');
        if (!client.user) {
            pastel('User is not logged in');
            return;
        }
        yield rest.put(v9_1.Routes.applicationGuildCommands(client.user.id, config_1.guildId), { body: commands });
        pastel('Finished refreshing application slash commands');
    }
    catch (error) {
        console.error(error);
    }
}));
client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    yield (0, bot_1.handleInteraction)(interaction);
    if (interaction.isButton()) {
        if (interaction.customId === 'accept-close') {
            if (interaction.channel && interaction.channel.isThread()) {
                yield interaction.channel.setLocked(true);
                const embed = new discord_js_2.EmbedBuilder()
                    .setTitle(':lock: Ticket Closed :lock:')
                    .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() })
                    .setDescription(`<@${interaction.user.id}> has closed this ticket. You can no longer reply to this ticket unless it is reopened by a staff member.\n\n**You have been DMd a link to your transcript for future reference.**`)
                    .setFooter({ text: 'Sea Cat Scallywags', iconURL: ((_a = interaction.client.user) === null || _a === void 0 ? void 0 : _a.avatarURL()) || '' })
                    .setTimestamp()
                    .setColor('#FF0000');
                yield interaction.update({ embeds: [embed], components: [] });
                const channelName = interaction.channel.name;
                const username = channelName.split('-')[1];
                const user = (_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.members.cache.find(member => member.user.username === username);
                if (user) {
                    const dmEmbed = new discord_js_2.EmbedBuilder()
                        .setTitle('Ticket Closed')
                        .setDescription(`Your ticket (<#${interaction.channelId}>), has been closed by <@${interaction.user.id}>.\n\nIf you need help again, make a new ticket by clicking the channel below.\n\n<#${config_1.ticketChannelId}>`)
                        .setColor('#FF0000')
                        .setTimestamp()
                        .setFooter({ text: 'Sea Cat Scallywags', iconURL: ((_c = interaction.client.user) === null || _c === void 0 ? void 0 : _c.avatarURL()) || '' });
                    yield user.send({ embeds: [dmEmbed] });
                }
            }
        }
        else if (interaction.customId === 'decline-close') {
            const declineEmbed = new discord_js_2.EmbedBuilder()
                .setTitle(':x: Closure Declined :x:')
                .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() })
                .setDescription(`<@${interaction.user.id}> has declined the closure request.\n\n**Staff will respond shortly.**`)
                .setFooter({ text: 'Sea Cat Scallywags', iconURL: ((_d = interaction.client.user) === null || _d === void 0 ? void 0 : _d.avatarURL()) || '' })
                .setTimestamp()
                .setColor('#FF0000');
            yield interaction.update({ embeds: [declineEmbed], components: [] });
        }
    }
}));
const commands = [
    {
        name: 'create-panel',
        description: 'Creates an embed for users to create tickets',
    },
    {
        name: 'close',
        description: 'Closes the current ticket',
    },
    {
        name: 'close-request',
        description: 'Requests to close the current ticket',
    },
];
const rest = new rest_1.REST({ version: '9' }).setToken(config_1.token);
client.login(config_1.token);
