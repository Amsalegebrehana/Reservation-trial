import Seam from 'seamapi'

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const seam = new Seam()

// const { connect_webview: connectWebview } = await seam.connectWebviews.create({
//   accepted_providers: ['schlage'],
// })

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.post('/webhook', async (req, res) => {
    
    console.log('Received webhook:', req.body);

    const reservationData = req.body;

    try {

        await seam.accessCodes.create({
            device_id: reservationData.device_id,
            code: '123456',
            name: 'Personal Access Code',
          })

        console.log('Lock set successfully');
    } catch (error) {
        console.error('Error setting the lock:', error);
    }

    res.status(200).send('Webhook received');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});