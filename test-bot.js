// test-bot.js
const TelegramBot = require('node-telegram-bot-api');

// Replace with your bot token from BotFather
const token = '8085243329:AAGdTicNp6NyBfKDCX5TfjaocQyhcBU1B2w';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Listen for /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name || 'User';
  
  bot.sendMessage(chatId, `Hello ${userName}! 👋

🤖 I'm your Sensor Alert Bot!

Your Chat ID is: ${chatId}
(Save this number - you'll need it for alerts)

Commands:
/start - Show this message
/status - Check if bot is working
/test - Send a test alert`);
});

// Listen for /status command
bot.onText(/\/status/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '✅ Bot is working perfectly!\n🔔 Ready to send alerts.');
});

// Listen for /test command
bot.onText(/\/test/, (msg) => {
  const chatId = msg.chat.id;
  const testAlert = `🚨 TEST ALERT 🚨

Component: Test Component
Sensor: Temperature
Value: 85°C (Threshold: 80°C)
Time: ${new Date().toLocaleString()}

This is a test alert!`;
  
  bot.sendMessage(chatId, testAlert);
});

// Handle any other messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  
  // If it's not a command, show help
  if (!text.startsWith('/')) {
    bot.sendMessage(chatId, `I received: "${text}"

I'm a sensor alert bot. Try these commands:
/start - Get started
/status - Check status
/test - Send test alert`);
  }
});

console.log('🤖 Telegram bot is running...');
console.log('📱 Go to Telegram and message your bot to test it!');