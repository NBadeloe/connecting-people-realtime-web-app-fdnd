const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = 4242;


app.use(express.static("public"));

// templating //
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
	res.render("index");
});

// Port //
http.listen(process.env.PORT || 4242, () =>
console.log(`App avaialble on http://localhost:4242`)
)

const users = {};
const typers = {}

io.on('connection', socket => {
    console.log('connected...');

    socket.on('user connected', payload => {
        users[socket.id] = {
            id: socket.id,
            name: payload.name,
            avatar: payload.avatar
        };

        socket.broadcast.emit('user connected', users[socket.id]);
    });

    socket.on('user typing', () => {
        typers[socket.id] = 1;

        socket.broadcast.emit('user typing', {
            user: users[socket.id].name,
            typers: Object.keys(typers).length
        });
    });

    socket.on('user stopped typing', () => {
        delete typers[socket.id];

        socket.broadcast.emit('user stopped typing', Object.keys(typers).length);
    });

    socket.on('send message', payload => {
        delete typers[socket.id];

        socket.broadcast.emit('send message', {
            user: payload.user,
            message: payload.message,
            typers: Object.keys(typers).length
        });
    });
});