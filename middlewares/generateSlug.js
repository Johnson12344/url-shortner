function genrateSlug(req, res, next){
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    const charArray = characters.split('')
    
    
    const randomCharStore = []
    Array.from(Array(6).keys()).forEach(()=>{
        const randomNumber = Math.floor(Math.random() * characters.length)
        const randomchar = charArray[randomNumber] 
        randomCharStore.push(randomchar)
    })

    req.slug = randomCharStore.join('')
    next();
}

module.exports = genrateSlug;