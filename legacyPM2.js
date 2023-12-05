const fs = require('fs');
const https = require('https');
const readlineSync = require('readline-sync');
const dotenv = require('dotenv');

// Lade Umgebungsvariablen aus .env-Datei
dotenv.config();

// Überprüfe, ob die .env-Datei vorhanden ist
if (!fs.existsSync('.env')) {
  // Frag die Werte von der Kommandozeile ab
  const domain = readlineSync.question('Bitte gib deine DuckDNS-Domain (nur den ersten Teil) ein: ');
  const token = readlineSync.question('Bitte gib deinen DuckDNS-Token ein: ');
  const updateTime = readlineSync.question('Bitte gib das Update-Intervall in Minuten ein: ');

  // Erstelle den Inhalt für die .env-Datei
  const envContent = `DOMAIN=${domain}\nTOKEN=${token}\nUPDATETIME=${updateTime}\n`;

  // Schreibe den Inhalt in die .env-Datei
  fs.writeFileSync('.env', envContent);

  console.log('.env-Datei erfolgreich erstellt.');
}

const duckDnsDomain = process.env.DOMAIN + ".duckdns.org";
const duckDnsToken = process.env.TOKEN;
const updateTime = process.env.UPDATETIME * 60 * 1000;

// Restlicher Code für die DynDNS-Aktualisierung
function updateDynDns() {
    const url = `https://www.duckdns.org/update?domains=${duckDnsDomain}&token=${duckDnsToken}`;
  
    const request = https.get(url, (res) => {
      let data = '';
  
      res.on('data', (chunk) => {
        data += chunk;
      });
  
      res.on('end', () => {
        handleResponse(data);
      });
    });
  
    request.on('error', (error) => {
      console.error('Error updating DynDNS:', error.message);
    });
  }
  
  function handleResponse(data) {
    if (data == "OK") {
      console.log('DynDNS update successful');
    } else {
      console.error('Error updating DynDNS');
    }
  }

// Aktualisiere alle 5 Minuten (300.000 Millisekunden)
updateDynDns();
setInterval(updateDynDns, updateTime);
