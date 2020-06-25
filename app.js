//Variables de entorno
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const connectDb = require('./dbConfig');
const Estudiantes = require('./models/Estudiantes');

const PORT = 3000;

// Intermediarios
app.use(bodyParser.json());

// Controladores

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/estudiantes/', async (req, res) => {
    const estudiantes = await Estudiantes.find().select('nombre edad');
    res.json({
        estudiantes,
        cantidad: estudiantes.length
    });
});

app.post('/api/estudiantes/', async (req, res) => {
    const { nombre, edad } = req.body;
    await Estudiantes.create({ nombre, edad });
    res.json({ nombre, edad });
});

app.get('/api/estudiantes/:id', async (req, res) => {
    try {
        const estudiante = await Estudiantes.findById(req.params.id).select('nombre edad');
        res.json({student: estudiante});
    } catch (error) {
        console.log(error);
        res.json({errormessage:error});
    }
});

app.put('/api/estudiantes/:id', async (req, res) => {

    const estudiante = await Estudiantes.findByIdAndUpdate(req.params.id,
        {
            $set: {
                nombre: req.body.nombre,
                edad: req.body.edad
            }
        },
         (err, docs) => {
            if (err){ 
                res.json({Errormessage: err});
            } 
            else{ 
                res.json({successmessage: "¡Estudiante actualizado correctamente!",
                          student: docs});
            }   
        }
    );

});

app.delete('/api/estudiantes/:id', async (req, res) => {

    const estudiante = await Estudiantes.findByIdAndDelete(req.params.id,
       (err, docs) => {
            if (err){ 
                res.json({errormessage: err});
            } 
            else{ 
                res.json({successmessage: "¡Estudiante eliminado correctamente!",
                          student: docs});
            }  
        }
    );

});

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Ejecutando en el puerto ${PORT}`);
        });
    })
    .catch((e) => {
        console.log(`Este es el error: ${e}`);
    });