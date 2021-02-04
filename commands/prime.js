const { MessageEmbed } = require('discord.js');

const check = n => {
	const sqrt = Math.sqrt(n);
	for (let i = 2; i <= sqrt; i++) {
		if (n % i === 0) return false;
	}
	return n >= 2;
};

module.exports = {
	name: 'isprime',
	aliases: [],
	cooldown: 3,
	// eslint-disable-next-line no-unused-vars
	execute: async (bot, message, args) => {
		const text = message.content.split(/ +/);
		args = text.slice(1);
		const num = parseInt(args[0]);
		if (isNaN(num) || num < 0 || num > 1000000) return message.channel.send('>>> ```md\n< Invalid number provided. >\n```**Allowed inputs:** 0 to 1000000\n**Correct Usage:** isPrime(<num>)');
		if ([0, 1].includes(num)) return message.channel.send(new MessageEmbed().setTitle(`${num} is a special number!`).setColor('#00FFFF'));
		if (check(num) === true) {
			return message.channel.send(new MessageEmbed().setTitle(`${num} is a prime number!`).setColor('#3DED97'));
		}
		else {
			return message.channel.send(new MessageEmbed().setTitle(`${num} is a composite number!`).setColor('#F9E076'));
		}
	},
};