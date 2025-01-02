import { Interaction, ChannelType, EmbedBuilder, TextChannel, ModalSubmitInteraction } from 'discord.js';
import { staffRoleId } from './config';
import { closeCommand } from './commands/close';
import { closeRequestCommand } from './commands/closeRequest';
import { createPanelCommand } from './commands/create-panel';
import { sendApplicationCommand } from './commands/sendApplication';

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
            await createPanelCommand(interaction);
        } else if (interaction.commandName === 'close') {
            await closeCommand(interaction);
        } else if (interaction.commandName === 'close-request') {
            await closeRequestCommand(interaction);
        } else if (interaction.commandName === 'send-application') {
            await sendApplicationCommand(interaction);
        }
    } else if (interaction.isModalSubmit()) {
        if (interaction.customId === 'staffApplicationModal') {
            const why = interaction.fields.getTextInputValue('whyInput');
            const vouch = interaction.fields.getTextInputValue('vouchInput');
            const experience = interaction.fields.getTextInputValue('experienceInput');
            const importants = interaction.fields.getTextInputValue('importantsInput');
            const extras = interaction.fields.getTextInputValue('extrasInput');

            const applicationEmbed = new EmbedBuilder()
                .setTitle(':white_check_mark: New Staff Application :white_check_mark:')
                .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() })
                .addFields(
                    { name: 'Why do you wish to be staff?', value: why },
                    { name: 'Can any Current Staff Vouch for you?', value: vouch },
                    { name: 'Have you previously been a staff member here or on any other server? Please list any relevant life experience.', value: experience },
                    { name: 'What is your Age? Time Zone? What console do you play on?', value: importants },
                    { name: 'Anything else?', value: extras }
                )
                .setColor('#FFD1DC')
                .setFooter({ text: 'Sea Cat Scallywags', iconURL: interaction.client.user?.avatarURL() || '' })
                .setTimestamp();

            const applicationChannel = interaction.guild?.channels.cache.get(`${process.env.APPLICATION_CHANNEL_ID}`) as TextChannel;
            if (applicationChannel) {
                await applicationChannel.send({ embeds: [applicationEmbed] });
            }

            await interaction.reply({ content: 'Your application has been submitted!', ephemeral: true });
        }
    }
};
