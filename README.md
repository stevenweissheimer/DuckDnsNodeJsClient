
# Duck Dyn Dns NodeJs Updater
A small tool to transmit the current IP address to the DuckDNS server after a specified time frame using NodeJs. 

## Installation

Install my-project with npm

```bash
  npm install
```
When you start DuckDNS for the first time, your data will be requested. Enter these and they will then be saved in an .env file. The server will now send your current IP to DuckDNS at your specified interval.

```bash
  npm install
```
### Create executable files.  
Für Windows x64:
```bash
npm run package-win-x64
```
Für Linux x64:
```bash
npm run package-linux-x64
```

Für macOS x64:
```bash
npm run package-macos-x64
```

### Mit PM2 als Dienst ausführen

#### 1. PM2 installieren

```bash
npm install -g pm2
```

#### 2. PM2 starten
```bash
npm run pm2-start
```

#### 3. PM2 Logs ansehen
```bash
npm run pm2-start
```
#### 4. PM2 Logs ansehen
```bash
npm run pm2-setup
```