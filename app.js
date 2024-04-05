const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');

// Middleware para procesar datos del cuerpo de las solicitudes HTTP
app.use(bodyParser.urlencoded({ extended: true }));

// Directorio de archivos estáticos
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('matricula')
});

// Ruta de confirmacion de matriculas
app.post('/confirmacion', (req, res) => {
    const {curso, medioPago, modulo} = req.body;
    let costoCurso = 0;
    let descuento = medioPago == "Pago en efectivo" ? true : false;

    console.log(modulo)
    console.log(modulo.length)

    switch (curso){
        case "Java":
            costoCurso = 1200
            break
        case "PHP":
            costoCurso = 800
            break
        case ".NET":
            costoCurso = 1500
            break
        default:
            costoCurso = 0
    }

    console.log(curso)
    console.log(costoCurso)

    let monto = costoCurso * modulo.length
    
    if(descuento){
        monto = monto - (monto*0.1)
    }



    res.render('confirmacion', {curso, medioPago, modulo, monto})


});

// Puerto en el que el servidor escucha las solicitudes
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
