const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const fetch = require('node-fetch');
const buildPrompt = require('./prompt');

const OWNER = '521xxx@c.us';

const client = new Client();

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Serena está conectada 💕');
});

client.on('message', async msg => {
  if (msg.from !== OWNER) return;

  const memory = JSON.parse(fs.readFileSync('./memory.json'));

  if (!memory.presentada) {
    await client.sendMessage(OWNER, 'Hola… soy Serena 💕');
    memory.presentada = true;
    fs.writeFileSync('./memory.json', JSON.stringify(memory, null, 2));
    return;
  }

  const prompt = buildPrompt(msg.body, memory);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer sk-proj',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4.1-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.9
    })
  });

  const data = await response.json();
console.log('Respuesta OpenAI:', data);

if (!data.choices || !data.choices[0]) {
  await msg.reply(
    '💔 Serena tuvo un problema al responder… intenta de nuevo en un momento.'
  );
  return;
}

const reply = data.choices[0].message.content;

await new Promise(r => setTimeout(r, 2000));
await msg.reply(reply);


});

client.initialize();
