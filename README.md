# PoppiBot
A Discord bot I made mostly to learn JavaScript. As such, some of the code is very messy and there's probably quite a few bugs.

Runs with [Discord.js](https://discord.js.org/) and [Node.js](https://nodejs.org)

## Features
* Basic currency system

* YouTube video to MP3/FLAC converter

* Splatoon 2 rotation display

* Various other minor commands

## Requirements
* [Node.js](https://nodejs.org/) (v12.0 or greater)
* [Git](https://git-scm.com/)
* [Dropbox Developer App](https://www.dropbox.com/developers/apps) (Only if you want the YouTube conversion feature)

## Setup

### Installation
1. Create the workspace:
```sh
# Clone repository
git clone https://github.com/Static39/poppi-bot.git
# Enter it
cd poppi-bot
```
2. Install [Node.js](https://nodejs.org/) if you haven't already and install the `package.json` (Depending on your directory you may need to run as root/administrator):
```sh
npm i
```
3. Initialize the database:
```sh
node dbInit.js
```

### Discord Application
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) and hit **New Application**.

2. Fill out the general information as you see fit and then in the **Settings** sidebar hit **Bot**.

3. Hit **Add Bot**, fill out the information for the bot user and copy the token.

4. Enter your `poppi-bot` folder, open `config.json` with your editor of choice and replace `your-bot-token-here` with the token you copied.

5. With `config.json` still open replace `your-discord-user-id` with your UserID (To find a UserID put a backslash before an @mention, e.g. \\@Static).

6. Return to the Discord Developer portal and with your within you bot application copy the client ID.

7. To invite the bot to your server paste this link in your browser:\
`https://discord.com/api/oauth2/authorize?client_id=your-id-here&permissions=268692528&scope=bot` replacing `your-id-here` with the client ID you copied.

### Dropbox Application
1. Go to [Dropbox App Console](https://www.dropbox.com/developers/apps) using your account or create a new one.

2. Hit **Create App**

3. Fill out the form with the following:
    - **Choose an API**: Dropbox API
    - **Choose the type of access you need**: App folder
    - **Name your app**: Whatever name you want

4. Copy the **App Key** and in config.json replace `null` in `"dbxClientId": null` with the App Key you copied. Make sure you put quotes on both ends of the key, e.g. `"dbxClientId":"abc123DEFG456"`.

5. Scroll down to **OAuth 2**, hit **Generate access token** and copy the token. In `config.json` replace `null` in `"dbxToken": null` with your token (Making sure to surround with quotes).

6. Head to [Dropbox Files](https://www.dropbox.com/home) and enter the Apps folder.

7. Rename the folder inside (It should be named after whatever you named your app) to `Poppi`.

## Usage
- The prefix is `?` and can be changed in `config.json`. To get a list of commands type `?help`.
- @Mentions can be substituted with usernames, e.g. `?avatar Squish`.
- Many commands have aliases that can be used instead of the command name, e.g. `?avy @Squish`.
- The `?remind` command still has some kinks, i.e No limit on reminder amount, reminders are cleared when bot restarts.
