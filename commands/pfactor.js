// Code inspired by stackoverflow.com/questions/22130043/trying-to-find-factors-of-a-number-in-js

const { MessageEmbed } = require('discord.js');

const list = n => {
	const p = [];
	for (let i = 2; i <= n; i++) {
		while ((n % i) === 0) {
			p.push(i);
			n /= i;
		}
	}
	return p;
	// returns prime factors (e.g. 2, 2, 2, 3)
};

const check = n => {
	const sqrt = Math.sqrt(n);
	for (let i = 2; i <= sqrt; i++) {
		if (n % i === 0) return false;
	}
	return n >= 2;
};

module.exports = {
	name: 'primefactor',
	aliases: ['pfactor', 'pf'],
	cooldown: 1,
	// eslint-disable-next-line no-unused-vars
	execute: async (bot, message, args) => {
		const text = message.content.split(/ +/);
		args = text.slice(1);
		const num = parseInt(args[0]);
		if (isNaN(num) || num < 0 || num > 1000000) return message.channel.send('>>> ```md\n< Invalid number provided. >\n```**Allowed inputs:** 0 to 1000000\n**Correct Usage:** primeFactor(<num>)');
		if ([0, 1].includes(num)) return message.channel.send(new MessageEmbed().setTitle(`${num} has no prime factors!`).setColor('#00FFFF'));
		if (check(num)) return message.channel.send(new MessageEmbed().setTitle(`${num} is a prime number!`).setDescription(`It has two factors: **{1, ${num}}**\n\nPrimes only have one prime factor: itself.\nTherefore, its only prime factor is ${num}.`).setColor('#F9E076'));
		const result = list(num);
		const unique = [...new Set(result)];
		if (result === unique) return message.channel.send(new MessageEmbed().setTitle(`${num} has a prime factorization of:`).setDescription(`${result.join(' × ')}`).setColor('#3DED97'));
		const arr = [];
		const map = result.reduce((x, y) => {
			x[y] = ++x[y] || 1;
			return x;
		}, {});
		unique.forEach(x => {
			arr.push(`${x}^${map[x]}`);
		});
		return message.channel.send(new MessageEmbed().setTitle(`${num} has a prime factorization of:`).setDescription(`${result.join(' × ')}\n\nWritten in exponential form:\n${arr.join(' × ')}`).setColor('#3DED97'));
	},
};