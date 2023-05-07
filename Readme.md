# Telegram Message to SMS (Alert)

This script will send sms message to your phone when a message from a selected chat is sent


## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the required packages.

```javascript
npm install
```

## Important

```javascript
console.log(client.session.save()) // copy the output of this

// paste the output in the StringSession below
const session = new StringSession("PASTE_THE_COPIED_SESSION_STRING_HERE");
```

## .env

```javascript
PORT=3000
ALERT_COMMAND=addalert
SMS_GATEWAY=https://sms.yegara.com/api
SMS_TOKEN=YEGARA_SMS_TOKEN
DATABASE_URL="postgresql://m2:randompassword@localhost:5432/telegram_notifier?schema=public"
```

## Usage
You have to use the commands in the chat you want to add to your alert list in a private message or group the command will be deleted automatically if successful plus you will receive a success message in saved message
### Commands
```javascript
/addalert
/stopalert


/addalert TRIGGER_TEXT
```
if `TRIGGER_TEXT` is not provided the message will be triggered by any message sent from the chat

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Developer

[Mikiyas Lemlemu](https://t.me/m_miko/)