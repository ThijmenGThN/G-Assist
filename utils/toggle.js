
module.exports = (G, res) => {

    // Filter
    if (
        G.cli.user.id != res.author.id                     ||
        res.content != process.env.activation_command
    ) return


    // Toggle activation
    G.state.listening = !G.state.listening


    console.log(`State changed, listening:`, G.state.listening)
    

    // Delete toggle command
    res.delete(1)

}
