
const path = require('path');

const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs-extra');
const { json } = require('body-parser');
const { spawn } = require('child_process');
const config = require('./server_config.json');
const pythonpath = config.PYTHON_SCRIPTS_FOLDER_PATH;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log("okay i am being called too")
    // console.log(req.body.uploadLocation)
    const array=JSON.parse(req.body.uploadLocation)
    const uploadLocation = `uploads/${array[0]}`;
    // const uploadLocation = `uploads/${"dhdh"}`;
    cb(null, uploadLocation);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.listen(9000, () => {
  console.log('Server is running on port 9000');
});

app.get('/', (req, res) => {
  const uniqueId = uuidv4();
  const folderName = `folder_${uniqueId}`;
  fs.mkdirSync(`uploads/${folderName}`);
  console.log(folderName)
  res.send(folderName);
});


app.post('/cleanup', (req, res) => {
  const uniqueId = req.body.pageid;
  const folderName = `folder_${uniqueId}`;
  const folderPath = `uploads/${folderName}`;
  console.log("uui",uniqueId)
  console.log("i am being calledhahahh ")

  fs.remove(folderPath)
    .then(() => {
      res.send('Directory deleted successfully!');
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Failed to delete the directory.');
    });
});

app.post('/getLogs', (req, res) => {
  const folderPath = "uploads/"+req.body.pageid;
  const filePath = path.join(folderPath, 'log.txt');

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File does not exist
      res.json([]);
    } else {
      // File exists, read its content
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          // Handle the error
          console.error(err);
          res.status(500).json({ error: 'An error occurred while reading the file.' });
        } else {
          // Split the content into an array of lines
          const logs = data.trim().split('\n');
          res.json(logs);
        }
      });
    }
  });
});








app.post('/oop', upload.single('file'), (req, res) => {
  const file = req.file;
  const dataArray=JSON.parse(req.body.uploadLocation);
  console.log(dataArray);
  const pythonProcess = spawn('python', [`${config.PYTHON_SCRIPTS_FOLDER_PATH}/mainScript.py`]);

  pythonProcess.stdin.write(JSON.stringify(dataArray));
  pythonProcess.stdin.end();

  pythonProcess.stdout.on('data', (data) => {
    // Handle stdout data from the Python script
    console.log(data.toString());
  });

  pythonProcess.stderr.on('data', (data) => {
    // Handle stderr data from the Python script
    console.error(data.toString());
  });

  pythonProcess.on('close', (code) => {
    // Handle process close event
    console.log(`Python script exited with code ${code}`);
    res.send(`Python script exited with code ${code}`);
  });
  // res.send('Received the file successfully!');
});

