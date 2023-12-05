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
async function updateDynDns() {
    try {
      const url = `https://www.duckdns.org/update?domains=${duckDnsDomain}&token=${duckDnsToken}`;
      
      const response = await new Promise((resolve, reject) => {
        https.get(url, (res) => {
          let data = '';
          
          res.on('data', (chunk) => {
            data += chunk;
          });
  
          res.on('end', () => {
            resolve({ text: () => data });
          });
        }).on('error', (error) => {
          reject(error);
        });
      });
  
      console.log('DynDNS update successful:', await response.text());
    } catch (error) {
      console.error('Error updating DynDNS:', error.message);
    }
  }

// Aktualisiere alle 5 Minuten (300.000 Millisekunden)
updateDynDns();
setInterval(updateDynDns, updateTime);
