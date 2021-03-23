
module.exports = (G, res) => {

    // Filter
    if (
        G.cli.user.id != res.author.id                     ||
        res.content != process.env.activation_command
    ) return


    // Toggle activation
    G.state.listening = !G.state.listening


    console.log(`State changed, listening:`, G.state.listening)


    // Respond to toggle and delete
    res.channel.send(`Listening set to: \` ${G.state.listening} \``)
    .then(post => setTimeout(() => post.delete(1), 2500))
    
    
    // Delete toggle command
    setTimeout(() => res.delete(1), 2500)

}
