const express = require('express');
const connectDB = require('./config/db');
const app = express();

var server = require('http').createServer(app);
const io = require('socket.io')(server);

//connect to db
connectDB();

app.use(express.json({extended: false}));

//Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/views/index.html')
})

//Models
const Song = require('./models/song');

//Controller
io.on('connection',async function (socket) {
    try {
        Song.distinct('artist',(error,artists) => {
            socket.emit('artistOptions',artists);
        })
        Song.distinct('genre',(error,genres) => {
            socket.emit('genreOptions',genres);
        })
        Song.distinct('year',(error,years) => {
            years = years.sort();
            socket.emit('yearOptions',years);
        })
    } catch (error) {
        console.log(error) 
    }
    socket.on('moreSongs',async (page,artist,genre,year) => {
        if(artist == "Any Artist" && genre == "Any Genre" && year == "Any Year"){
            Song.paginate({}, {page: page,limit: 8 },function(err, result) {
                socket.emit('addSongs',result.docs);
            })
        }
    })
    socket.on('filter',async (page,artist,genre,year) => {
        let obj = {}
        if(artist!="Any Artist") obj.artist = artist;
        if(genre!="Any Genre") obj.genre = genre;
        if(year!="Any Year") obj.year = year;

        const list = await Song.find(obj);     
        socket.emit('addSongsFilter',list);  
    })
});


const PORT = 5000;
server.listen(PORT, () => console.log(`Server runing on port ${PORT}`)); 