const config = require('../config.json');
const ffmpeg = require('ffmpeg');
const ytdl = require('ytdl-core');
const fs = require('fs');
const CronJob = require('cron').CronJob;
const addHours = require('date-fns/addHours');
const fetch = require('node-fetch');
const Dropbox = require('dropbox').Dropbox;

module.exports = {
	name: 'download',
	aliases: ['convert'],
	description: 'Converts a youtube link to an mp3 or flac. Defaults to mp3.',
	usage: '``?download https://www.youtube.com/watch?v=TzqBFURAZDA flac``',
	hidden: false,
	async execute(_bot, message, args) {
		if (message.channel.type !== 'text') return;
		
		// Checks if Dropbox client ID and token exist
		if (!config.dbxClientId || !config.dbxToken) return message.channel.send('This command has not been setup.');

		if (!args[0]) return message.channel.send('Please give a valid YouTube link.');

		// Initiates a new Dropbox instance
		const dbx = new Dropbox({
			fetch: fetch,
			clientId: config.dbxClientId,
			accessToken: config.dbxToken
		})

		// Cuts parameters off URL if necessary
		const link = args[0].replace(/&.*/, '').trim();
		const regex1 = /https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9-_]{11}/gm;
		const regex2 = /https:\/\/youtu\.be\/[a-zA-Z0-9-_]{11}/gm;
		const regex3 = /https:\/\/m\.youtube\.com\/watch\?v=[a-zA-Z0-9-_]{11}/gm;

		// Checks for quality arg
		let songFormat;

		if (args[1] === 'flac') songFormat = 'flac';
		else if(args[1] === 'mp3') songFormat = 'mp3';
		else {
			songFormat = 'mp3';
		}

		// Checks for valid URL
		if (!regex1.test(link) && !regex2.test(link) && !regex3.test(link)) {
			return message.channel.send('Please give a valid YouTube link.');
		}

		// Gets video information
		const videoInfo = await ytdl.getInfo(link);

		// Gets the last thumbnail URL in the array
		const lastIndex = videoInfo.player_response.videoDetails.thumbnail.thumbnails.length - 1;
		const albumArt = videoInfo.player_response.videoDetails.thumbnail.thumbnails[lastIndex].url;

		// Checks if video length is over 12 minutes
		if (videoInfo.player_response.videoDetails.lengthSeconds > 720) {
			return message.channel.send('Specified video is too long. Videos must be under 12 minutes.');
		}
		const vidId = videoInfo.player_response.videoDetails.videoId;
		const vidName = videoInfo.player_response.videoDetails.title.replace(/"/g, '\'');

		// Time at which to delete upload
		const expireDate = addHours(new Date(), 1);

		// Starts typing event
		message.channel.send('Converting video...')
			.then(() => {
				message.channel.startTyping();
			});

		try {
			ytdl(link)
				.pipe(fs.createWriteStream(`./assets/conversion/${vidId}.avi`).on('finish', async () => {
					try {
						// Converts video to mp3
						var video = await new ffmpeg(`./assets/conversion/${vidId}.avi`);

						if (albumArt) {
							video.addCommand('-i', `${albumArt.replace(/&.*/, '').trim()}`);
						}
						video.addCommand('-map 0:1 -map 1:0');
						video.addCommand('-id3v2_version', '3');
						video.addCommand(`-metadata Title=\"${vidName}\" -metadata:s:v title="Album cover" -metadata:s:v comment="Cover (front)"`);
						video.addCommand('-c:a', `${songFormat}`);
						// Only sets bitrate if format is mp3
						if (songFormat === 'mp3') {
							video.addCommand('-b:a', '320k');
						}
						video.addCommand('-ar', '44100');
						video.addCommand('-y');
						video.save(`./assets/conversion/${vidId}.${songFormat}`, async (error, file) => {
							if (error) {
								console.log(error);
								return message.channel.send('An error has occurred. Please try again later or contact Masterpon.');
							}

							// Reads the newly converted file
							fs.readFile(file, async (err, data) => {
								if (err) {
									console.log(error);
									return message.channel.send('An error has occurred. Please try again later or contact Masterpon.');
								}
								// Uploads the converted file
								dbx.filesUpload({
									contents: data,
									path: `/${vidName.replace(/[/\\?%*:|"<>]/g, '-')}.${songFormat}`,
									mute: true,
									mode: 'overwrite'
								})
									.then(async () => {
										// Sets up a cron job to delete after 1 hours
										const deleteJob = new CronJob(expireDate, function() {
											dbx.filesDeleteV2({ path: `/${vidName.replace(/[/\\?%*:|"<>]/g, '-')}.${songFormat}`})
											.then(() => {
												this.stop();
											})
											.catch(error => {
												console.log(error);
												message.channel.send('An error has occurred. Please try again later or contact Masterpon.');
												this.stop();
											});
										})

										// Creates an hour link
										const tempLink = await dbx.filesGetTemporaryLink({ path: `/${vidName.replace(/[/\\?%*:|"<>]/g, '-')}.${songFormat}` });

										// Download link embed
										const embed = {
											"title": `${vidName}`,
											"description": `[**__Download__**](${tempLink.link})`,
											"color": 10299826,
											"timestamp": `${new Date}`,
											"thumbnail": {
												"url": `${albumArt}`
											}
										};
										message.channel.send({ embed });
										deleteJob.start();
									})
									.catch(error => {
										console.log(error);
										return message.channel.send('An error has occurred. Please try again later or contact Masterpon.');
									});
							});
							message.channel.stopTyping();

							// Deletes files after uploading
							fs.unlink(`./assets/conversion/${vidId}.avi`, error => {
								if (error) console.log(error);
							});
							fs.unlink(`./assets/conversion/${vidId}.${songFormat}`, error => {
								if (error) console.log(error);
							});
						});
						// Conversion error
					} catch (e) {
						console.log(e.code);
						console.log(e.msg);
						console.log(e);
						return message.channel.send('An error has occurred. Please try again later or contact Masterpon.');
					}
				})
				);
		}
		// ytdl or writeStream error
		catch (error) {
			console.log(error);
			return message.channel.send('An error has occurred. Please try again later or contact Masterpon.');
		}

	}
}
