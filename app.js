
// Global
let G = { 
    cli: new (require(`discord.js`)).Client(),
    state: { listening: false },
    rateLimiter: 0,
    reducers: {}, 
    cache: {}
}


// Init dotenv
require(`dotenv`).config()


// Auth Discord client
G.cli.login(process.env.discord_token)


// Await ready signal
G.cli.on(`ready`, () => console.log(G.cli.user.tag + `, online!`) )


// Rate limiter, reducer
setInterval(() => { if (G.rateLimiter > 0) G.rateLimiter-- }, 1000)


// Await message
G.cli.on(`message`, res => {

    // Host activation toggler
    require(`./utils/toggle`)(G, res)

    // Assist foreign requester
    require(`./utils/assist`)(G, res)

})


// Developer tools, debugger
if (process.env.debug == `on`) setInterval(() => console.log( G.cache, `\nlistening: ${G.state.listening}\nrateLimiter:`, G.rateLimiter + `s` ), 1000)
