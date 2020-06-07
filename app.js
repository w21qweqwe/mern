const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
const PORT = config.get('port') || 5000


app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/link', require('./routes/link.routes.js'))
app.use('/t', require('./routes/redirect.routes.js'))


if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


async function start(){
	try{
		await mongoose.connect(config.get('mongoUri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		})
		app.listen(PORT, () => console.log(`QWEPP started on port ${PORT}`))

	}   catch(e){
		console.log('QWEPP server error', e.message)
		process.exit(1)
	}
}
start()