// Code inspired by stackoverflow.com/questions/22130043/trying-to-find-factors-of-a-number-in-js

const { MessageEmbed } = require('discord.js');

const list = n => [...Array(n + 1).keys()].filter(i => n % i === 0);

module.exports = {
	name: 'listfactors',
	aliases: ['factors', 'list'],
	cooldown: 3,
	// eslint-disable-next-line no-unused-vars
	execute: async (bot, message, args) => {
		const text = message.content.split(/ +/);
		args = text.slice(1);
		const num = parseInt(args[0]);
		if (isNaN(num) || num < 0 || num > 1000000) return message.channel.send('>>> ```md\n< Invalid number provided. >\n```**Allowed inputs:** 0 to 1000000\n**Correct Usage:** listFactors(<num>)');
		if (num === 0) return message.channel.send(new MessageEmbed().setTitle('0 has an infinite number of factors.').setColor('#00FFFF'));
		const result = list(num);
		return message.channel.send(new MessageEmbed().setTitle(`${num} has the factors:`).setDescription(`{${result.join(', ')}}`).setColor('#3DED97'));
	},
};