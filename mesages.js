const express = require('express');
const routs = express.Router();
const fs = require('fs');
console.log("check1");

// Route for GET request to /
routs.post('/', (req, res, next) => {
    console.log("check2");
    fs.readFile('message.txt', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading from file:', err);
            return res.status(500).send('Error reading from file');
        }

        
        const messages = data.split('\n').filter(msg => msg); 
        let messageList;

        if (messages.length > 0) {
            messageList = `<ul>${messages.map(msg => {
                const [username, message] = msg.split(':'); 
                return `<li><strong>${username}</strong>: ${message}</li>`; 
            }).join('')}</ul>`;
        } else {
                        messageList = `<p>No messages.</p>`;
        }

        res.send(`
            <h2>Messages</h2>
            ${messageList} <!-- Displaying messages or no messages -->
            <script>
                function storage() {
                    const username = localStorage.getItem('username');
                    document.getElementById('hiddenUsername').value = username;
                    console.log('Username from local storage:', username);
                }
                window.onload = storage;
            </script>
            <form method="POST" action="/sms">
                <input type="hidden" name="username" id="hiddenUsername">
                <input type="text" name="message" id="message" required>
                <button type="submit">Send</button>
            </form>
        `);
    });
});

// Route for POST request to /
routs.post('/sms', (req, res, next) => {
    console.log('dddd');
    const username = req.body.username; 
    const message = req.body.message; 
    const logEntry = `${username}:${message}\n`;

    
    fs.appendFile('message.txt', logEntry, (err) => {
        if (err) {
            console.log('Error writing to file:', err);
            return res.status(500).send('Error writing to file');
        }
    
        console.log('Message saved:', logEntry);
        res.redirect('/'); 
    });
});

module.exports = routs;
