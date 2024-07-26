export const checkUser =  (req, res) => {
    const { username, pass } = req.body;
    // checking by static password and username
    if ( username === 'admin' && pass === 'admin123'){
        res.json({message: 'User Found', status : 200, username})
    }
    else {
        res.json({message: 'User not found', status: 404})
    }
}