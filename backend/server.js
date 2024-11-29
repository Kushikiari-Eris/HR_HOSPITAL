const express = require('express')
const dotenv = require('dotenv')
const dbConnection = require('./config/DbConnection')
const userRoutes = require('./routes/userRoutes')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path');
const allCoursesRoutes = require('./routes/allCoursesRoutes')
const scheduleTrainingRoutes = require('./routes/scheduleTrainingRoutes')
const taskRoutes = require('./routes/taskRoutes')
const reportsRoutes = require('./routes/reportsRoutes')
const employeeTimeLogRoutes = require('./routes/employeeTimeLogRoutes')
const shiftScheduleRoutes = require('./routes/shiftSchedulingRoutes')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
dotenv.config()
dbConnection()

app.get('/', (req, res) =>{
    res.json({ Hello: "World"})
})

// Serve static files from 'uploads' folder at '/uploads' route
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Use routes for APIs
app.use('/api', userRoutes)
app.use('/api', allCoursesRoutes)
app.use('/api', scheduleTrainingRoutes)
app.use('/api', taskRoutes)
app.use('/api', reportsRoutes)
app.use('/api', employeeTimeLogRoutes)
app.use('/api', shiftScheduleRoutes)


app.listen(process.env.PORT)