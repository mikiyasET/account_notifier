# Telegram Message to SMS (Alert)

This script will send sms message to your phone when a message from a selected chat is sent using [Yegara Free SMS API Gateway](https://yegara.com/sms.php)

to change the sms gateway to your preferred gateway you have to change the `sendSMS` function in `general.ts` file under the `src/utils` folder

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the required packages.

```bash
npm install
```

## Important
If you don't what to login each time time you run the script **copy** the session string you see on your terminal after you login in for the first time and **paste** it to the `SessionString` object as the example below.
```javascript
console.log(client.session.save()) // copy the output of this

// paste the output in the StringSession below
const session = new StringSession("PASTE_THE_COPIED_SESSION_STRING_HERE");
```

## .env

```javascript
PORT="3000"
ALERT_COMMAND="addalert"
SMS_GATEWAY="https://sms.yegara.com/api"
SMS_TOKEN="YEGARA_SMS_TOKEN"
PHONE_NUMBER="0912345678"
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