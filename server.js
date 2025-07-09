const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();



// const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
 

// Middleware to parse JSON
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'SCOTT',
  database: 'mtdc_dashboard',
  connectionLimit: 10 
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL database');
  connection.release();
});


// POST route to save data
app.post('/save-data', (req, res) => {
  const data = req.body;
  console.log('Received data:', data);

  const sql = `
    INSERT INTO region_metrics
    (region_name,sales, expenses, income, online_booking, walkin, occupancy_rate, operational_rooms, total_rooms, income_today, previous_year_income, guest_arrivals, online_arrivals, cashpayment,walk_ins, no_shows, resort_collection, restaurant_collection)
    VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
  `;
  const values = [
   Number(data.region_name) || 0,
    Number(data.sales) || 0,
    Number(data.expenses) || 0,
    Number(data.income) || 0,
    Number(data.onlineBooking) || 0,
    Number(data.walkin) || 0,
    Number(data.occupancyRate) || 0,
    Number(data.operationalRooms) || 0,
    Number(data.totalRooms) || 0,
    Number(data.incomeToday) || 0,
    Number(data.previousYearIncome) || 0,
    Number(data.guestArrivals) || 0,
    Number(data.onlineArrivals) || 0,
    Number(data.cashpayment) || 0,
    Number(data.walkIns) || 0,
    Number(data.noShows) || 0,
    Number(data.resortCollection) || 0,
    Number(data.restaurantCollection) || 0
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('SQL Error:', err);
      return res.status(500).json({ error: 'Failed to save data' });
    }
    res.json({ message: 'Data s`aved successfully!' });
  });
});

// Start the server`
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
// !BACKEND MESSAGE
app.post('/send-message', (req, res) => {
  const { sender_email, recipient_email, subject, message } = req.body;
  
  const sql = `
    INSERT INTO internal_messages 
    (sender_email, recipient_email, subject, message)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [sender_email, recipient_email, subject, message], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Message sent!' });
  });
});
