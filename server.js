const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

const audioFolder = path.join(__dirname, 'public/audio');

app.use(express.static('public'));

app.get('/api/audiolist', (req, res) => {
  fs.readdir(audioFolder, (err, files) => {
    if (err) {
      console.error('Error reading audio files:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const audioList = files
      .filter(file => file.endsWith('.mp3'))
      .map(file => ({
        title: path.basename(file, path.extname(file)),
        src: `audio/${file}`
      }));
console.log(JSON.stringify(audioList));
    res.json(audioList);
  });
});

app.use(bodyParser.json());

app.post('/setsysDateTime', (req, res) => {
    const { datetime } = req.body;

    // Format the datetime string as needed by the `date` command
    const formattedDateTime = new Date(datetime).toISOString().replace(/T/, ' ').replace(/\..+/, '');

    // Execute the `date` command to set the system date and time
    exec(`sudo date --set="${formattedDateTime}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error setting system date and time: ${stderr}`);
            res.status(500).send('Failed to update system date and time.');
        } else {
            console.log(`System date and time updated: ${stdout}`);
            res.status(200).send('System date and time updated successfully.');
        }
    });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
