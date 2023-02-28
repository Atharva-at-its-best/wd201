const http = require("http");
const fs = require("fs");
const readline = require("readline");

let homeContent = "";
let projectContent = "";
let registrationContent = "";

fs.readFile("home.html", (err, home) => {
    if (err) {
        throw err;
    }
    homeContent = home;
});

fs.readFile("project.html", (err, project) => {
    if (err) {
        throw err;
    }
    projectContent = project;
});

fs.readFile("registration.html", (err, registration) => {
    if (err) {
        throw err;
    }
    registrationContent = registration;
});

const portIndex = process.argv.indexOf('--port');
let port = 5000;
if (portIndex !== -1 && process.argv[portIndex + 1]) {
    port = parseInt(process.argv[portIndex + 1], 10);
} else {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question("Enter port number: ", (answer) => {
        port = parseInt(answer, 10);
        rl.close();
        startServer();
    });
}

function startServer() {
    http.createServer((request, response) => {
        let url = request.url;
        if (url === '/webpage.css') {
            response.writeHead(200, { 'Content-Type': 'text/css' });
            fs.readFile('webpage.css', 'utf8', (err, css) => {
                if (err) {
                    response.writeHead(404);
                    response.end();
                } else {
                    response.end(css);
                }
            });
        } else {
            response.writeHead(200);
            switch (url) {
                case '/project':
                    response.write(projectContent);
                    break;
                case '/registration':
                    response.write(registrationContent);
                    break;
                case '/webpage.js':
                    response.writeHead(200, { 'Content-Type': 'text/javascript' });
                    fs.readFile('webpage.js', 'utf8', (err, js) => {
                        if (err) {
                            response.writeHead(404);
                            response.end();
                        } else {
                            response.end(js);
                        }
                    });
                    return;
                case '/webpage.jpg':
                    response.writeHead(200, { 'Content-Type': 'image/jpeg' });
                    fs.readFile('webpage.jpg', (err, image) => {
                        if (err) {
                            response.writeHead(404);
                            response.end();
                        } else {
                            response.end(image);
                        }
                    });
                    return;
                default:
                    response.write(homeContent);
                    break;
            }
            response.end();
        }
    }).listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    });
}
