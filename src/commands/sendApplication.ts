import { CommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } from 'discord.js';

export const sendApplicationCommand = async (interaction: CommandInteraction) => {
    const embed = new EmbedBuilder()
        .setTitle('Staff Application')
        .setDescription('Please fill out the following form to apply for a staff position.')
        .setColor('#FFD1DC')
        .setFooter({ text: 'Sea Cat Scallywags', iconURL: interaction.client.user?.avatarURL() || '' })
        .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });

    const modal = new ModalBuilder()
        .setCustomId('staffApplicationModal')
        .setTitle('Staff Application Form');

    const whyInput = new TextInputBuilder()
        .setCustomId('whyInput')
        .setLabel('Why do you wish to be staff?')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const vouchInput = new TextInputBuilder()
        .setCustomId('vouchInput')
        .setLabel('Can any Current Staff Vouch for you?')
        .setStyle(TextInputStyle.Short)
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
};