import { CommandInteraction, ChannelType, EmbedBuilder, TextChannel } from 'discord.js';

export const createPanelCommand = async (interaction: CommandInteraction) => {
    const category = await interaction.guild?.channels.cache.find(channel => channel.type === ChannelType.GuildCategory && channel.name === 'Tickets');
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

            await interaction.reply({ content: 'Please select a category for your ticket.', fetchReply: true, ephemeral: true });
            if (interaction.channel instanceof TextChannel) {
                interaction.channel.send({
                    content: 'Create a ticket',
                    components: [selectMenu],
                });
            } else {
                console.error('Channel type does not support sending messages.');
            }
};