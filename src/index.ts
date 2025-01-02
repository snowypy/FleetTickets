import { Client, GatewayIntentBits } from 'discord.js';
import { token, guildId, staffRoleId, ticketChannelId } from './config';
import { handleInteraction } from './bot';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { EmbedBuilder } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const pastelPink = '\x1b[38;2;255;209;220m';
const resetColor = '\x1b[0m';

function pastel(message: string) {
    console.log(`${pastelPink}${message}${resetColor}`);
}

client.once('ready', async () => {
    pastel(`Started Tickets as ${client.user?.tag}!`);

    try {
        pastel('Refreshing application slash commands');

        if (!client.user) {
            pastel('User is not logged in');
            return;
        }

        await rest.put(
            Routes.applicationGuildCommands(client.user.id, guildId),
            { body: commands },
        );

        pastel('Finished refreshing application slash commands');
    } catch (error) {
        console.error(error);
    }
});

client.on('interactionCreate', async interaction => {
    await handleInteraction(interaction);

    if (interaction.isButton()) {
        if (interaction.customId === 'accept-close') {

            if (interaction.channel && interaction.channel.isThread()) {
                await interaction.channel.setLocked(true);

                const embed = new EmbedBuilder()
                  .setTitle(':lock: Ticket Closed :lock:')
                  .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() })
                  .setDescription(`<@${interaction.user.id}> has closed this ticket. You can no longer reply to this ticket unless it is reopened by a staff member.\n\n**You have been DMd a link to your transcript for future reference.**`)
                  .setFooter({ text: 'Sea Cat Scallywags', iconURL: interaction.client.user?.avatarURL() || '' })
                  .setTimestamp()
                  .setColor('#FF0000');

                await interaction.update({ embeds: [embed], components: [] });
                const channelName = interaction.channel.name;
                const username = channelName.split('-')[1];
                const user = interaction.guild?.members.cache.find(member => member.user.username === username);

                if (user) {
                    const dmEmbed = new EmbedBuilder()
                        .setTitle('Ticket Closed')
                        .setDescription(`Your ticket (<#${interaction.channelId}>), has been closed by <@${interaction.user.id}>.\n\nIf you need help again, make a new ticket by clicking the channel below.\n\n<#${ticketChannelId}>`)
                        .setColor('#FF0000')
                        .setTimestamp()
                        .setFooter({ text: 'Sea Cat Scallywags', iconURL: interaction.client.user?.avatarURL() || '' });
                
                    await user.send({ embeds: [dmEmbed] });
                }
            }
        } else if (interaction.customId === 'decline-close') {

                const declineEmbed = new EmbedBuilder()
                .setTitle(':x: Closure Declined :x:')
                .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() })
                .setDescription(`<@${interaction.user.id}> has declined the closure request.\n\n**Staff will respond shortly.**`)
                .setFooter({ text: 'Sea Cat Scallywags', iconURL: interaction.client.user?.avatarURL() || '' })
                .setTimestamp()
                .setColor('#FF0000');

            await interaction.update({ embeds: [declineEmbed], components: [] });
        }
    }
});

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
    {
        name: 'send-application',
        description: 'Sends a staff application form',
    },
];

const rest = new REST({ version: '9' }).setToken(token);

client.login(token);
