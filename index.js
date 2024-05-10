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

app.get("/hotals", async (req, res) => {
  try {
    const hotals = await readAllHotals();
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

async function readHotelByCategory(hotelCategory) {
  try {
    const hotelByCategory = await Hotals.findOne({ category: hotelCategory });
    return hotelByCategory;
  } catch (error) {
    throw error;
  }
}

app.get("/hotels/category/:hotelCategory", async (req, res) => {
  try {
    const hotel = await readHotelByCategory(req.params.hotelCategory);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "hotal not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to fetch" });
  }
});

async function createHotal(newHotal) {
  try {
    const hotal = new Hotals(newHotal);
    const saveHotal = await hotal.save();
    console.log(saveHotal);
    return saveHotal;
  } catch (error) {
    throw error;
  }
}

app.post("/hotels", async (req, res) => {
  try {
    const saveHotal = await createHotal(req.body);
    res
      .status(201)
      .json({ message: "Hotel added successfully", hotel: saveHotal });
  } catch (error) {
    console.error("Error adding hotel:", error); // Log the error for debugging
    res.status(500).json({ error: "Failed to add Hotel" });
  }
});

async function deleteHotel(hotelId) {
  try {
    const deletedHotel = await Hotals.findByIdAndDelete(hotelId);
    return deletedHotel;
  } catch (error) {
    throw error;
  }
}

app.delete("/hotels/:hotelId", async (req, res) => {
  try {
    const deletedHotal = await deleteHotel(req.params.hotelId);
    if (deletedHotal) {
      res.status(200).json({ message: "Hotal deleted successfully" });
    } else {
      res.status(404).json({ error: "Hotal not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "filed to fetch data" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is on port ${PORT}`);
});
