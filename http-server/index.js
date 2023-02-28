const http = require("http");
const fs = require("fs");
let minimist = require("minimist")
let args = minimist(process.argv.slice(2), {
    default: {
        port: 3000
    }
});

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

http.createServer((request, response) => {
    let url = request.url;
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
        case '/webpage.css':
            response.writeHead(200, { 'Content-Type': 'text/css' });
            fs.readFile('webpage.css', 'utf8', (err, css) => {
                if (err) {
                    response.writeHead(404);
                    response.end();
                } else {
                    response.end(css);
                }
            });
            return;
        default:
            response.write(homeContent);
            break;
    }
    response.end();
}).listen(args.port)
