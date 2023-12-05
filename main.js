const axios = require('axios');
const dotenv = require('dotenv');

// Lade Umgebungsvariablen aus .env-Datei
dotenv.config();

const duckDnsDomain = process.env.DOMAIN;
const duckDnsToken = process.env.TOKEN;
const updateTime = (process.env.UPDATETIME * 60 * 1000);

async function updateDynDns() {
  try {
    const response = await axios.get(`https://www.duckdns.org/update?domains=${duckDnsDomain}&token=${duckDnsToken}`);
    console.log('DynDNS update successful:', response.data);
  } catch (error) {
    console.error('Error updating DynDNS:', error.message);
  }
}

// Aktualisiere alle 5 Minuten (300.000 Millisekunden)
updateDynDns();
setInterval(updateDynDns, updateTime);