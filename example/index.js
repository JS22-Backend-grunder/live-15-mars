const fs = require('fs'); // En inbyggd modul i Node.js

fs.readFile('style.css', 'utf8', (error, content) => { // Det första argumentet är alltid om det blev fel, det andra om inläsningen lyckades
    if (content) {
        console.log(content);
        const ids = content.split('#');
        console.log(ids.length - 1);
    } else {
        console.log(error);
    }
});