import { Interaction, ChannelType, EmbedBuilder, Message, TextChannel, ButtonInteraction, ThreadAutoArchiveDuration, ThreadChannel } from 'discord.js';
import { staffRoleId } from './config';
import { closeCommand } from './commands/close';
import { closeRequestCommand } from './commands/closeRequest';

export const handleInteraction = async (interaction: Interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'create-panel') {
            
        } else if (interaction.customId === 'create-ticket-button') {
            try {
                const channelId = interaction.channelId;

                if (!interaction.channel) {
                    return;
                }

                const thread = await (interaction.channel as TextChannel).threads.create({
                    name: `support-${interaction.user.username}`,
                    autoArchiveDuration: 60,
                    type: ChannelType.PrivateThread,
                    reason: `Created by <@${interaction.user.id}>`,
                });

                if (thread) {
                    const welcomeEmbed = new EmbedBuilder()
                        .setTitle(':wave: Welcome to Sea Cats Support! :wave:')
                        .setDescription('Thanks for making a ticket. A member of our team will be with you ASAP.\n\n**Please be clear when describing your issue.**')
                        .setColor('#FFD1DC')
                        .setThumbnail(interaction.guild?.iconURL() || '')
                        .setTimestamp()
                        .setFooter({ text: 'Sea Cat Scallywags', iconURL: interaction.client.user?.avatarURL() || '' });

                    await thread.send({ content: `<@&${staffRoleId}>`, embeds: [welcomeEmbed] });
                    await thread.members.add(interaction.user.id);

                    const createdTicketEmbed = new EmbedBuilder()
                        .setTitle(':white_check_mark: Ticket Created :white_check_mark:')
                        .setDescription(`Your ticket has been created. <#${thread.id}>\n\n**Please respect staff in your ticket to avoid a ticket suspension or blacklist.**`)
                        .setColor('#FFD1DC')
                        .setTimestamp()
                        .setFooter({ text: 'Sea Cat Scallywags', iconURL: interaction.client.user?.avatarURL() || '' });

                    await interaction.reply({
                        embeds: [createdTicketEmbed],
                        ephemeral: true,
                    });
                    console.log(`Created a new ticket: support-${interaction.user.username}`);
                } else {
                    console.error('Hit a snag creating a new ticket.');
                }
            } catch (error) {
                console.error('Hit a snag creating a new ticket.', error);
            }
        }
    } else if (interaction.isCommand()) {
        if (interaction.commandName === 'create-panel') {
            const embed = new EmbedBuilder()
                .setTitle('Open a Ticket – Let’s Purr-sue the Issue!')
                .setDescription('Reach out to our paw-some staff for support with any issue you’re facing!\n\nIn the future, you’ll be asked to choose a category for your ticket – it’ll help us purr-iotize your issue faster than a cat chasing a laser pointer!')
                .addFields([
                    { name: 'General Support', value: 'The quickest and purr-fect way to reach out to our team is through this panel. We’ll be purr-sisting until your problem is solved!' },
                    { name: 'Blacklist Issues', value: 'Having trouble with the blacklist? Don’t fur-get to create a ticket here so we can look into it. We’ll be paw-sitive about fixing it!' },
                    { name: 'Alliance Issues', value: 'Got some kitty drama in your alliance? Drop us a ticket here, and we’ll help sort things out in a cat-astrophic hurry!' },
                ])
                .setColor('#FFD1DC')
                .setFooter({ text: 'Sea Cat Scallywags', iconURL: interaction.client.user?.avatarURL() || '' })
                .setTimestamp()
                .setThumbnail(interaction.guild?.iconURL() || '');

            await interaction.reply({ content: 'The panel has been sent to the channel.', fetchReply: true, ephemeral: true });
            if (interaction.channel instanceof TextChannel) {
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
            } else {
                console.error('Channel type does not support sending messages.');
            }
        } else if (interaction.commandName === 'close') {
            await closeCommand(interaction);
        } else if (interaction.commandName === 'close-request') {
            await closeRequestCommand(interaction);
        }
    }
};
