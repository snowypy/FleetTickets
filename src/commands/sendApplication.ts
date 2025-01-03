import { CommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export const sendApplicationCommand = async (interaction: CommandInteraction) => {
    const embed = new EmbedBuilder()
        .setTitle('Staff Application')
        .setDescription('Click the button below to apply for a staff position.')
        .setColor('#FFD1DC')
        .setFooter({ text: 'Sea Cat Scallywags', iconURL: interaction.client.user?.avatarURL() || '' })
        .setTimestamp();

    const button = new ButtonBuilder()
        .setCustomId('openApplicationModal')
        .setLabel('Apply Now')
        .setStyle(ButtonStyle.Primary);

    const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

    await interaction.reply({ embeds: [embed], components: [buttonRow], ephemeral: false });
};