# import dependencies
express = require "express"
path = require "path"

# global settings
port = 9000
app_root = __dirname

# create server
app = module.exports = express.createServer()

# server configuration
app.configure () ->
    app.use express.bodyParser()
    app.use express.methodOverride()
    app.use express.cookieParser()
    app.use express.session secret : '83809LKSJFDS09DOI32J423098OKD'
    app.use app.router
    # view options
    app.set 'views', path.join(app_root, 'public')
    #app.set 'view engine', 'jade'
    app.set 'view options', layout : false
    # static files
    app.use express.static path.join(app_root, 'public')

app.register '.html',
    compile : (str, options) ->
        (locals) ->
            str

# call back function for fetching data
index = (req, res) ->
    context =
        title : 'My Title'

    res.render 'index.html', context

test = (req, res) ->
    context =
        title : "testing"

    res.render path.join(__dirname, "test/index.html")

# map the routes with the callback function
app.get '/', index
app.get '/test', test

app.listen port, (event) ->
    console.log "[*] Server listening on #{port}"
