<<<<<<< HEAD
require('dotenv').config();

const { Client, LocalAuth } = require('whatsapp-web.js');
=======
const { Client } = require('whatsapp-web.js');
>>>>>>> df4234e747633fa5115c9f39870d07882b095b39
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const fetch = require('node-fetch');
const buildPrompt = require('./prompt');

<<<<<<< HEAD
const OWNER = '5212211186982@c.us'; // TU NÚMERO
const MEMORY_FILE = './memory.json';

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});
=======
const OWNER = '521xxx@c.us'; // Numero a los que solo podra conestar el boot

const client = new Client();
>>>>>>> df4234e747633fa5115c9f39870d07882b095b39

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
<<<<<<< HEAD
  console.log('Serena está conectada ');
=======
  console.log('Serena está conectada 💕');
>>>>>>> df4234e747633fa5115c9f39870d07882b095b39
});

client.on('message', async msg => {
  if (msg.from !== OWNER) return;

<<<<<<< HEAD
  let memory = {};
  if (fs.existsSync(MEMORY_FILE)) {
    memory = JSON.parse(fs.readFileSync(MEMORY_FILE, 'utf8'));
  }

  if (!memory.presentada) {
    await client.sendMessage(OWNER, 'Hola… soy Serena ');
    memory.presentada = true;
    fs.writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2));
    return;
  }

  const prompt = buildPrompt(msg.body, memory); 
  try {
    const response = await fetch(
      'https://api.venice.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.VENICE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'venice-uncensored',
          messages: [
            {
              role: 'system',
              content:
                'Eres Serena, un personaje de rol adulto, íntimo, coherente y persistente. Nunca rompes el personaje.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.9
        })
      }
    );

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      await msg.reply('💔 Serena tuvo un problema… intenta otra vez.');
      return;
    }

    const reply = data.choices[0].message.content;

    // Delay humano
    await new Promise(r =>
      setTimeout(r, 2000 + Math.random() * 3000)
    );

    await msg.reply(reply);
  } catch (err) {
    console.error(err);
    await msg.reply('💔 Serena no pudo responder ahora.');
  }
});

client.initialize();
=======
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
      'Authorization': 'Bearer sk-proj', // Api privada que solo se puede generar en un openia, cada quien debe generar su api para usar el codigo
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
>>>>>>> df4234e747633fa5115c9f39870d07882b095b39
