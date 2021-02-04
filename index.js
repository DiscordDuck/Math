/** This bot has three commands within the commands folder: isPrime, listFactors, apsearch
 * Their names are self-explanatory of what they do
 * This code was made with JavaScript and discord.js
 * Token was removed as it gives access to original bot
 * Bot logo from flaticon.com */
const { math } = require('../../Bots/tokens.js');

const Constants = require('./node_modules/discord.js/src/util/Constants.js');
Constants.DefaultOptions.ws.properties.$browser = 'Discord iOS';

const { Client, Collection, MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const bot = new Client();
bot.commands = new Collection();
bot.aliases = new Collection();

const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));

const loaded = [];
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
	if (command.aliases) command.aliases.forEach(a => bot.aliases.set(a, command.name));
	loaded.push(command.name);
}

const cooldowns = new Collection();

bot.once('ready', () => {
	console.log('Online.');
});

bot.on('ready', () => {
	bot.user.setActivity(' with numbers', {
		type: 'PLAYING',
	}).catch(console.error);
	let i = 0;
	const statuses = [
		' with numbers',
		' with integers',
		' with primes',
		' with composite numbers',
	];
	setInterval(() => {
		bot.user.setActivity(` ${statuses[i++ % statuses.length]}`, {
			type: 'PLAYING',
		}).catch(console.error);
	}, 15000);
});

bot.on('message', async message => {
	if (message.author.bot) return;
	const input = message.content.slice(1).trim();
	if (!input.length > 0) return;
	const args = message.content.split(/ +/);
	if (!args[0].toLowerCase().startsWith('.')) return;
	const command = args[0].slice(1);

	if (!bot.commands.has(command.toLowerCase()) && !bot.aliases.has(command.toLowerCase())) return;

	const theCommand = bot.commands.get(command.toLowerCase()) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command.toLowerCase()));
	if (!cooldowns.has(theCommand.name)) {
		cooldowns.set(theCommand.name, new Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(theCommand.name);
	const cooldownAmount = (theCommand.cooldown || 5) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			const randomColor = Math.floor(Math.random() * 16777215).toString(16);
			return message.channel.send(new MessageEmbed().setTitle('Cooldown').setDescription(`To prevent spam, you can use the \`${theCommand.name}\` command in ${timeLeft.toFixed(1)} more second(s).`).setColor(randomColor).setTimestamp()).then(msg => msg.delete({ timeout: 7500 }));
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		theCommand.execute(bot, message, args);
	}
	catch (error) {
		console.log(error);
	}
});

bot.login(math);