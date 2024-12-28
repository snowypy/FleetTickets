import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { ticketChannelId } from '../config';

export const closeCommand = async (interaction: CommandInteraction) => {
    if (interaction.channel && interaction.channel.isThread()) {
        await interaction.channel.setLocked(true);

        const embed = new EmbedBuilder()
            .setTitle(':lock: Ticket Closed :lock:')
            .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() })
            .setDescription(`<@${interaction.user.id}> has closed this ticket. You can no longer reply to this ticket unless it is reopened by a staff member.\n\n**You have been DMd a link to your transcript for future reference.**`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter({ text: 'Sea Cat Scallywags', iconURL: interaction.client.user?.avatarURL() || '' });

        await interaction.reply({ embeds: [embed], components: [] });
        const channelName = interaction.channel.name;
        const username = channelName.split('-')[1];
        const user = interaction.guild?.members.cache.find(member => member.user.username === username);

        if (user) {
            const dmEmbed = new EmbedBuilder()
                .setTitle('Ticket Closed')
                .setDescription(`Your ticket <#${interaction.channelId}> has been closed by <@${interaction.user.id}>. If you need assistance again, please create a new ticket by clicking the button below.\n\n<#${ticketChannelId}>`)
                .setColor('#FF0000')
                .setTimestamp()
                .setFooter({ text: 'Sea Cat Scallywags', iconURL: interaction.client.user?.avatarURL() || '' });

            await user.send({ embeds: [dmEmbed] });
        }

    }
};
