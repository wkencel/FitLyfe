const pool = require('../model/TrainerModel');

pool.on('error', (err, client) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

const traineeController = {
  async getAllTrainees(req, res, next) {
    const getAllTraineesQuery =
      'SELECT client_table.*, biometrics_table.* FROM client_table INNER JOIN biometrics_table ON biometrics_table.clientID=client_table.ClientID';
    await pool.query(getAllTraineesQuery, (err, results) => {
      if (err) {
        console.log('GET ALL Trainees Controller Error:', err);
        //next() function needs to be invoked in each conditional code block when using async and await
        next(err);
      } else {
        res.locals.getAllTrainees = results.rows;
        console.log('GET ALL Trainees Controller SUCCESS');
        //next() function needs to be invoked in each conditional code block when using async and await
        next();
      }
    });
  },

  async getOneTrainee(req, res, next) {
    const clientid = req.params.clientid;
    const getOneTraineeQuery = 'SELECT * FROM client_table WHERE clientid = $1';

    await pool.query(getOneTraineeQuery, [clientid], (err, results) => {
      if (err) {
        console.log('GET ONE Trainee Controller Error:', err);
        next(err);
      } else {
        res.locals.getOneTrainee = results.rows;
        console.log('GET ONE Trainee Controller SUCCESS');
        next();
      }
    });
  },

  createTrainee(req, res, next) {
    const { contracts, firstname, lastname, email, age, gender, weight_lbs, height } = req.body;
    const createTraineeQuery =
      'INSERT INTO client_table (contracts, firstname, lastname, email, age, gender, weight_lbs, height) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
    pool.query(
      createTraineeQuery,
      [contracts, firstname, lastname, email, age, gender, weight_lbs, height ],
      (err, results) => {
        if (err) return sendStatus(401)
         return next();
      },
    );

  },

  async updateTrainee(req, res, next) {
    const clientid = req.params.clientid;
    const { firstname, lastname } = req.body;
    const updateTraineeQuery =
      'UPDATE client_table SET firstname = $1, lastname = $2 WHERE clientid = $3';

    await pool.query(
      updateTraineeQuery,
      [firstname, lastname, clientid],
      (err, results) => {
        if (err) return sendStatus(401)
          next();
      },
    );
  },
  async createDiet(req, res, next) {
    const { daily_water_intake_ounces, daily_calorie_intake_grams, daily_macros_intake_grams, clientid } = req.body;
    const createDietQuery =
      'INSERT INTO diet_table (daily_water_intake_ounces, daily_calorie_intake_grams	, daily_macros_intake_grams) VALUES ($1, $2, $3) WHERE clientid=$4';

    await pool.query(
      createDietQuery,
      [daily_water_intake_ounces, daily_calorie_intake_grams, daily_macros_intake_grams, clientid],
      (err, results) => {
        if (err) {
          console.log('CREATE diet Controller Error:', err);
          next(err);
        } else {
          res.locals.createDiet = req.body;
          console.log('GET ONE diet Controller SUCCESS');
          next();
        }
      },
    )
  },

  async deleteTrainee(req, res, next) {
    const clientid = req.params.clientid;
    const deleteTraineeQuery = 'DELETE FROM client_table WHERE clientid = $1';

    await pool.query(deleteTraineeQuery, [clientid], (err, results) => {
      if (err) {
        console.log('DELETE Trainee Controller Error:', err);
        next(err);
      } else {
        console.log('DELETE Trainee Controller SUCCESS');
        next();
      }
    });
  },
};

module.exports = traineeController;
