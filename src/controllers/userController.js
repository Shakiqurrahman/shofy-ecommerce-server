export const checkUser =  (req, res) => {
    const { username, pass } = req.body;
    // checking by static password and username
    if ( username === 'admin' && pass === 'dnjnkjs'){
        res.json({message: 'User Found', status : 200})
    }
    res.json({message: 'User not verified', status: 204})
}