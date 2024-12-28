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
exports.createPanelCommand = void 0;
const discord_js_1 = require("discord.js");
const createPanelCommand = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const category = yield ((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.find(channel => channel.type === discord_js_1.ChannelType.GuildCategory && channel.name === 'Tickets'));
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
    yield interaction.reply({ content: 'Please select a category for your ticket.', fetchReply: true, ephemeral: true });
    if (interaction.channel instanceof discord_js_1.TextChannel) {
        interaction.channel.send({
            content: 'Create a ticket',
            components: [selectMenu],
        });
    }
    else {
        console.error('Channel type does not support sending messages.');
    }
});
exports.createPanelCommand = createPanelCommand;
