const express = require("express");
const app = express();

const { initializeDatabase } = require("./db/db.connect");
const Hotals = require("./models/hotal.models");

app.use(express.json());

initializeDatabase();

async function readAllHotals() {
  try {
    const allHotal = await Hotals.find();
    return allHotal;
  } catch (error) {
    throw error;
  }
}

app.get("/hotals", (req, res) => {
  try {
    const hotals = readAllHotals();
    if (hotals.length !== 0) {
      res.json(hotals);
    } else {
      res.status(404).json({ error: "Hotal not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to fetch data" });
  }
});

async function readHotelsByName(hotelName) {
  try {
    const hotelByName = await Hotals.findOne({ name: hotelName });
    return hotelByName;
  } catch (error) {
    throw error;
  }
}

app.get("/hotels/:hotelName", async (req, res) => {
  try {
    const hotel = await readHotelsByName(req.params.hotelName);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "Hotel not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to fetch data" });
  }
});

async function readHotelByPhoneNumber(phoneNumber) {
  try {
    const hotelByPhoneNumber = await Hotals.findOne({
      phoneNumber: phoneNumber,
    });
    return hotelByPhoneNumber;
  } catch (error) {
    throw error;
  }
}

app.get("/hotels/directory/:phoneNumber", async (req, res) => {
  try {
    const hotel = await readHotelByPhoneNumber(req.params.phoneNumber);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "Hotel not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

async function readHotelsByRating(hotalRating) {
  try {
    const hotelByRating = await Hotals.findOne({ rating: hotalRating });
    return hotelByRating;
  } catch (error) {
    throw error;
  }
}

app.get("/hotels/rating/:hotelRating", async (req, res) => {
  try {
    const hotel = await readHotelsByRating(req.params.hotelRating);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "hotel not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "faied to fetch" });
  }
});

async function readHotelByCategory(hotelCategory){
  try{
    const hotelByCategory = await Hotals.findOne({category: hotelCategory})
    return hotelByCategory
  }catch(error){
    throw error
  }
}

app.get("/hotels/category/:hotelCategory", async (req,res) => {
  try{
    const hotel = await readHotelByCategory(req.params.hotelCategory)
    if(hotel){
      res.json(hotel)
    }else{
      res.status(404).json({error: "hotal not found"})
    }
  }catch(error){
    res.status(500).json({error: "failed to fetch"})
  }
})



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is on port ${PORT}`);
});
