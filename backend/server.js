require('dotenv').config()

// Module imports
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const dbConnect = require('./config/dbConnect')
const mongoose = require('mongoose')

// App initialization
const app = express()
const PORT = process.env.PORT || 3500

// Database connection
dbConnect()

// Middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

// Static files
app.use('/', express.static(path.join(__dirname, '/public')))

// Routes
app.use('/', require('./routes/root'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/routes', require('./routes/routeRoutes'))
app.use('/conversations', require('./routes/conversationRoutes'))
app.use('/messages', require('./routes/messageRoutes'))

// Error handling
app.all('*', (req, res) => {
	res.status(404)
	if (req.accepts('html')) {
		res.sendFile(path.join(__dirname, 'views', '404.html'))
	} else if (req.accepts('json')) {
		res.json({ message: '404 Not Found' })
	} else {
		res.type('txt').send('404 Not Found')
	}
})

// Connect to MongoDB and start server
mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB')
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', (err) => {
	console.log(err)
})
