const express = require('express')
const path = require('path');
const router = express.Router()
const { 
    getAllTrainees, 
    getOneTrainee, 
    createTrainee, 
    updateTrainee, 
    deleteTrainee 
} = require('../controllers/traineeController');

//get all trainee
router.get('/allTrainees', getAllTrainees, (req, res) => {
  res.status(200).json(res.locals.getAllTrainees)
  console.log('allTrainees GET REQUEST SUCCESS')
});

//get a trainee
router.get('/oneTrainee/:clientid', getOneTrainee, (req, res) => {
  res.status(200).json(req.params.clientid)
  console.log(`oneTrainee GET REQUEST SUCCESS: ${req.params.clientid}`)
});

//add a trainee
router.post('/newTrainee', createTrainee, (req, res) => {
  res.status(200).send(`Trainee ${req.body.firstname} ${req.body.lastname} has been created.`)
  console.log('newTrainee POST REQUEST SUCCESS')
});

//update trainee info
router.put('/updateTrainee/:clientid', updateTrainee, (req, res) => {
  res.status(200).send(`Trainee modified with ID: ${req.params.clientid}`)
  console.log('updateTrainee PUT REQUEST SUCCESS')
});

//delete a trainee
router.delete('/removeTrainee/:clientid', deleteTrainee, (req, res) => {
  res.status(200).send(`Trainee deleted with ID: ${req.params.clientid}`)
  console.log('removeTrainee DELETE REQUEST SUCCESS')
});

//add a trainee diet
// router.post('/adddailydiet/:clientid', createDiet, (req, res) => {
//   res.status(200).send(`water intake ${req.body.daily_water_intake_ounces} has been created.`)
//   console.log('diet POST REQUEST SUCCESS')
// });


module.exports = router;