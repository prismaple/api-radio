const router = require('express').Router();
const jwt = require("jsonwebtoken");
const fs = require('fs');
const { default: axios } = require('axios');

router.get("/urlStations/:date", async (req, res) => {
    try {
        const { date } = req.params;

        // Assuming your Bunny CDN URL is something like "https://your-bunny-cdn-url.com/urlStation.txt"
        const bunnyCdnUrl = `https://NaadMiniStorage.b-cdn.net/RadioStationList/URLstations.txt`;

        // Fetch the file from Bunny CDN
        const response = await axios.get(bunnyCdnUrl);

        // Extract file data from the response
        const fileData = response.data;
        fileUpdateDate = fileData.split("\n")[1].replace("\r", "")

        return res.json({
            status: true,
            message: "Task Done",
            details: date == fileUpdateDate ? "FALSE" : bunnyCdnUrl,
        });

    } catch (error) {

        return res.json({
            status: false,
            message: error?.message || error?.response?.message || "API Error",
            details: error
        });
    }
})

module.exports = router
