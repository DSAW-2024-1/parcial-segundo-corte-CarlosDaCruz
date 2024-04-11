const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi API de consulta de precios de criptomonedas!');
});

app.get('/coin', (req, res) => {
  res.send('Selecciona un nombre de criptomoneda en la URL con /coin/(Nombre_cripto)');
});

app.get('/coin/:coinName', async (req, res) => {
  try {
    const { coinName } = req.params;
    const response = await fetch(`https://api.coincap.io/v2/assets/${coinName}`);
    const data = await response.json();

    if (data.data) {
      const price = data.data.priceUsd;
      res.send(`El precio en dólares de ${coinName} para el día de hoy es ${price}`);
    } else {
      res.send('El nombre de la criptomoneda no fue encontrado en la base de datos');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error al procesar tu solicitud');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const students = [
  'ACERO GARCIA, SAMUEL',
  'ALJURI MARTINEZ, DAREK',
  'CEPEDA URIBE, JUAN FELIPE',
  'CHAVES PEREZ, ANA MARIA',
  'CRUZ PAVAS, CARLOS DAVID',
  'DIAZ ALGARIN, DIEGO NORBERTO',
  'DIAZ BERNAL, JORGE ESTEBAN',
  'DIAZ VARGAS, DAVID ESTEBAN',
  'FORERO PEÑA, JUAN JOSE',
  'GUTIERREZ DE PIÑERES BARBOSA, SANTIAGO',
  'LOPEZ HUERTAS, SAMUEL ESTEBAN',
  'MEDINA FERNANDEZ, MICHAEL STEVEN',
  'MORENO CARVAJAL, KATHERIN JULIANA',
  'MORENO PATARROYO, JUAN PABLO',
  'MUÑOZ SENDOYA, NICOLAS ESTEBAN',
  'NAVARRO CUY, SANTIAGO',
  'PARRADO MORALES, JUAN PABLO',
  'RAMIREZ CHINCHILLA, DANIEL SANTIAGO',
  'RESTREPO COCA, JUAN PABLO',
  'REYES GONZALEZ, GABRIELA',
  'RODRIGUEZ FALLA, JUAN JOSE',
  'RUIZ TORRES, VALENTINA',
  'SALAS GUTIERREZ, MARIANA',
  'SANCHEZ SANDOVAL, SEBASTIAN',
  'SARMIENTO GUARNIZO, JOSUE DAVID',
  'SOLER PRADO, SANTIAGO',
  'TAMAYO LOPEZ, MARIA FERNANDA',
  'URREA LARA, DEIVID NICOLAS',
  'AZCONA, ANDRÉS'
];

app.get('/users/:count', (req, res) => {
  const { count } = req.params;
  const { sort } = req.query;

  let sortedStudents = [...students];

  if (sort === 'DESC') {
    sortedStudents = sortedStudents.sort((a, b) => {
      const [lastNameA, firstNameA] = a.split(', ');
      const [lastNameB, firstNameB] = b.split(', ');
      return lastNameB.localeCompare(lastNameA);
    });
  } else {
    sortedStudents = sortedStudents.sort((a, b) => {
      const [lastNameA, firstNameA] = a.split(', ');
      const [lastNameB, firstNameB] = b.split(', ');
      return lastNameA.localeCompare(lastNameB);
    });
  }

  const userList = sortedStudents.slice(0, count).map(student => {
    const [lastName, firstName] = student.split(', ');
    return { firstName, lastName };
  });

  res.json(userList);
});

//Tercera parte (Incompleta)

app.get('/users', (req, res) => {
  res.send('Creando usuarios');
});

app.post('/users', (req, res) => {
  const { nombre, apellido, correo, ciudad, country } = req.body;


  if (!nombre || !apellido || !correo) {
    return res.status(400).json({ error: 'Faltan datos obligatorios: nombre, apellido o correo' });
  }


  const ciudadDefault = ciudad || 'Bogotá';
  const countryDefault = country || 'Colombia';

  const usuario = {
    nombre,
    apellido,
    correo,
    ciudad: ciudadDefault,
    country: countryDefault
  };

  res.json(usuario);
});