const express = require('express')
const { sendMailing } = require('./src/services/sendMail')
const app = express()


app.use(express.text())
app.use(express.json())
app.use(express.urlencoded({extended:false})) 

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://www.nexdext.com' );
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST');
    next();
})


app.post('/sendEmail', async (req, res)=>{
    
    try {
        const {name, email, message} = req.body
    
        // Validación campos no pueden estar vacíos
        if(name === "") return res.status(400).json({error:'El campo nombre no puede estar vacío'})
        if(message === "") return res.status(400).json({error:'El campo mensaje no puede estar vacío'})
        if(email === "") return res.status(400).json({error:'El campo email no puede estar vacío'})
        
        // Validación del email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if(!emailRegex.test(email)) return res.status(400).json({error:'El email no es válido'})
    
    
        const response = await sendMailing(name, email, message)
    
        res.status(200).json({
            message:'Mensaje enviado correctamente'
        })

    } catch (error) {
        res.status(400).json({error:'Hubo un error en el envío de los datos'})
        
    }
})

app.get('/', (req, res) => {
    res.status(200).json({message:'Welcome to NexDex'});
});

app.listen(4000)
console.log(`server on port ${4000}`)




