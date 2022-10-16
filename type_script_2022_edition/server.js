const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const urls = [
  { path: '/', filePath: 'index.html' },
  { path: '/get-started', filePath: './src/1.get_started/index.html' },
  { path: '/basics-and-basic-types', filePath: './src/2.ts_basics_and_basic_types/index.html' },
  { path: '/classes', filePath: './src/5.classes_and_interfaces/index.html' },
  { path: '/interfaces', filePath: './src/5.classes_and_interfaces/index_interfaces.html' },
  { path: '/advanced-types', filePath: './src/6.advanced_types/index.html' },
]

app.use('/dist', express.static(path.join(__dirname, 'dist')));

urls.forEach((url) => {
  app.get(url.path, (req, res) => {
    res.sendFile(path.join(__dirname, url.filePath));
  });
})

function start() {
  try {
    app.listen(PORT, (error) => {
      if (error) throw error;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Server start error: ", err);
  }
}

start();