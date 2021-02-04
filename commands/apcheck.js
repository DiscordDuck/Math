// Code inspired by stackoverflow.com/questions/22130043/trying-to-find-factors-of-a-number-in-js
// Very inefficient code but still does the job

const { MessageEmbed } = require('discord.js');

const check = n => [...Array(n + 1).keys()].filter(i => n % i === 0).length;
const list = n => [...Array(n + 1).keys()].filter(i => n % i === 0);

module.exports = {
	name: 'apsearch',
	aliases: ['apcheck', 'ap'],
	cooldown: 1,
	// eslint-disable-next-line no-unused-vars
	execute: async (bot, message, args) => {
		const text = message.content.split(/ +/);
		args = text.slice(1);
		if (!args[0] || !args[1]) return message.channel.send('>>> ```md\n< Invalid number provided. >\n```**Allowed inputs:** 0 to 10000\n**Correct Usage:** apsearch(<num1>, <num2>)');
		let num1 = parseInt(args[0]);
		let num2 = parseInt(args[1]);
		if (isNaN(num1) || isNaN(num2) || num1 < 0 || num2 > 10000 || num1 === num2) return message.channel.send('> **Invalid number provided.**\n**Allowed inputs**: 0 to 1000000\n**Correct Usage:** apcheck(<num1>, <num2>)');
		if (num2 < num1) {
			num1 = num2;
			num2 = parseInt(args[0]);
		}
		let ap = check(num1);
		let ap2 = ap;
		let ap3 = ap;
		let res = num1;
		let res2 = num1;
		let res3 = num1;
		for (let i = num1 + 1; i <= num2; i++) {
			const result = check(i);
			if (result > ap) {
				ap = check(i);
				res = i;
			}
			else if (result > ap2) {
				ap2 = check(i);
				res2 = i;
			}
			else if (result > ap3) {
				ap3 = check(i);
				res3 = i;
			}
		}
		const result = list(res);
		if (res === res2) res2 = null;
		if (res === res3) res3 = null;
		if (res2 === res3) res3 = null;
		num1 = parseInt(args[0]);
		num2 = parseInt(args[1]);
		return message.channel.send(new MessageEmbed().setTitle(`The highly-composite number is ${res}!`).setDescription(`Within your specified range of numbers to check (from ${num1} to ${num2}), **${res}** is the most-composite number with **${ap} factors**. This does not mean it is necessarily an anti-prime, it's just that it has the largest number of factors within that range.${res3 ? `\n\nRunner-ups include: **${res2}** with **${ap2} factors**, and **${res3}** with **${ap3} factors.**` : (res2 ? `\n\nThere is one runner-up: **${res2}** with **${ap2} factors.**` : '')}\n\n**${res}** has the factors:\n{${result.join(', ')}}${res2 ? `\n**${res2}** has the factors:\n{${list(res2).join(', ')}}` : ''}${res3 ? `\n**${res3}** has the factors:\n{${list(res3).join(', ')}}` : ''}`).setColor('#3DED97'));
	},
};