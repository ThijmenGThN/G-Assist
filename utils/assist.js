
module.exports = (G, res) => {

    // Filter
    if (
        G.cli.user.id == res.author.id        || 
        res.guild                             || 
        G.rateLimiter > 0                     ||
        !G.state.listening
    ) return


    // Identifier
    let IDF = res.channel.id


    // Check for cooldown
    if (G.cache[IDF] > 0) return
    

    // Append to cache
    clearInterval(G.reducers[IDF])
    G.cache[IDF] = process.env.cooldown_inSeconds
    G.rateLimiter = process.env.rateLimiter_inSeconds
    
    
    // Reduce cooldown
    G.reducers[IDF] = setInterval(() => {

        // Reduce cooldown
        G.cache[IDF]--


        // Terminate interval once idle
        if (G.cache[IDF] <= 0) clearInterval(G.reducers[IDF])

    }, 1000)


    console.log(res.author.tag, `seeked contact, emitting afk message.`)

    
    // Apply reply delay
    setTimeout(() => {

        // Simulate conversation
        res.channel.startTyping()
        setTimeout(() => {

            // Respond to requester with prefab response
            res.channel.send(process.env.response_message)
        
        
            // Terminate typing behaviour
            res.channel.stopTyping()

        }, process.env.typing_duration)
        
    }, process.env.reply_delay)

}
