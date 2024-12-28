import { CommandInteraction, ChannelType, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

export const closeRequestCommand = async (interaction: CommandInteraction) => {

    if (interaction.channel?.type === ChannelType.PrivateThread && interaction.channel.name.startsWith('support-')) {

        const embed = new EmbedBuilder()
            .setTitle(':clipboard: Close Ticket Request :clipboard:')
            .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() })
            .setDescription(`<@${interaction.user.id}> has requested to close this ticket.\n\nAre you sure you want to close this ticket?`)
            .setColor('#FFD1DC')
            .setTimestamp()
            .setFooter({ text: 'Sea Cat Scallywags', iconURL: interaction.client.user?.avatarURL() || '' });

        const acceptButton = new ButtonBuilder()
            .setCustomId('accept-close')
            .setEmoji('✅')
            .setLabel('Accept and Close')
            .setStyle(ButtonStyle.Success);

        const declineButton = new ButtonBuilder()
            .setCustomId('decline-close')
            .setEmoji('❌')
            .setLabel('Decline Closure')
            .setStyle(ButtonStyle.Danger);

        const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(acceptButton, declineButton);

        await interaction.reply({ embeds: [embed], components: [actionRow], ephemeral: false });
    } else {

        const errorEmbed = new EmbedBuilder()
            .setTitle(':x: Error :x:')
            .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() })
            .setDescription('This command can only be used in tickets.\n\nIs this a ticket? If so contact <@721017166652244018>')
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter({ text: 'Sea Cat Scallywags', iconURL: interaction.client.user?.avatarURL() || '' });

        await interaction.reply({ embeds: [errorEmbed], ephemeral: false });
    }
};
