import { Interaction, ChannelType, ModalBuilder, TextInputStyle, TextInputBuilder, ActionRowBuilder, EmbedBuilder, TextChannel, ModalSubmitInteraction } from 'discord.js';
import { staffRoleId } from './config';
import { closeCommand } from './commands/close';
import { closeRequestCommand } from './commands/closeRequest';
import { createPanelCommand } from './commands/create-panel';
import { sendApplicationCommand } from './commands/sendApplication';

export const handleInteraction = async (interaction: Interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'openApplicationModal') {
                const modal = new ModalBuilder()
                    .setCustomId('staffApplicationModal')
                    .setTitle('Staff Application Form');
        
                const whyInput = new TextInputBuilder()
                    .setCustomId('whyInput')
                    .setLabel('Why do you wish to be staff?')
                    .setStyle(TextInputStyle.Paragraph)
                    .setRequired(true);
        
                const vouchInput = new TextInputBuilder()
                    .setCustomId('vouchInput')
                    .setLabel('Can any Current Staff Vouch for you?')
                    .setStyle(TextInputStyle.Paragraph)
                    .setRequired(true);
        
                const experienceInput = new TextInputBuilder()
                    .setCustomId('experienceInput')
                    .setLabel('Have you previously been a staff member here or on any other server? Please list any relevant life experience.')
                    .setStyle(TextInputStyle.Paragraph)
                    .setRequired(true);
        
                const importantsInput = new TextInputBuilder()
                    .setCustomId('importantsInput')
                    .setLabel('What is your Age? Time Zone? What console do you play on?')
                    .setStyle(TextInputStyle.Paragraph)
                    .setRequired(true);
        
                const extrasInput = new TextInputBuilder()
                    .setCustomId('extrasInput')
                    .setLabel('Anything else you would like to add?')
                    .setStyle(TextInputStyle.Paragraph)
                    .setRequired(false);
        
                const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(whyInput);
                const secondActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(vouchInput);
                const thirdActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(experienceInput);
                const fourthActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(importantsInput);
                const fifthActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(extrasInput);
        
                modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);
        
                await interaction.showModal(modal);
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
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
                .addFields(
                    { name: 'Why do you wish to be staff?', value: why },
                    { name: 'Can any Current Staff Vouch for you?', value: vouch },
                    { name: 'Have you previously been a staff member here or on any other server? Please list any relevant life experience.', value: experience },
                    { name: 'What is your Age? Time Zone? What console do you play on?', value: importants },
                    { name: 'Anything else?', value: extras },
                    { name: 'Discord ID', value: interaction.user.id }
                )
                .setThumbnail(interaction.user.displayAvatarURL())
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
