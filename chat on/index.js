const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));  // Serve os arquivos estáticos do cliente

io.on('connection', (socket) => {
  console.log('Novo usuário conectado');

  socket.on('register', (username) => {
    socket.username = username;
    console.log(`Usuário registrado: ${username}`);
  });

  socket.on('message', (encryptedMessage) => {
    const data = {
      username: socket.username || 'Anônimo',
      encryptedMessage,
    };
    io.emit('message', data);  // Envia a mensagem para todos
  });

  socket.on('disconnect', () => {
    console.log(`Usuário ${socket.username || 'Anônimo'} desconectado`);
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
