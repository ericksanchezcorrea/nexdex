import express from "express";
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json())  // para el método post
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', BASE_URL_FRONT );
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.status(200).json({message:'Welcome to my project. Check the other routes like "/api/laptops"'});
});


app.use('/api', usersRoutes)
app.use('/api', laptopsRoutes)
app.use('/api', paymentRoutes)
app.use('/api', addressRoutes)
app.use('/api', shoppingCartRoutes)

app.use((req, res)=>{res.status(404).json({message:'endpoint not found in deploy'})})


export default app