const router = require("express").Router();

const artist = require("../models/artist");

// Route to save a new artist
router.post("/save", async (req, res) => {
  try {
    const newArtist = artist({
      name: req.body.name,
      imageURL: req.body.imageURL,
      twitter: req.body.twitter,
      instagram: req.body.instagram,
    });

    // Save the new artist to the database
    const savedArtist = await newArtist.save();

    // Respond with the saved artist
    res.status(200).send({ artist: savedArtist });
  } catch (error) {
    // Error occurred while saving the artist
    res.status(400).send({ success: false, msg: error });
  }
});

// Route to get a single artist by ID
router.get("/getOne/:getOne", async (req, res) => {
  try {
    const filter = { _id: req.params.getOne };

    // Find the artist by ID
    const cursor = await artist.findOne(filter);

    if (cursor) {
      // Artist found
      res.status(200).send({ success: true, data: cursor });
    } else {
      // Artist not found
      res.status(200).send({ success: true, msg: "No Data Found" });
    }
  } catch (error) {
    // Error occurred while fetching the artist
    res.status(500).send({ success: false, msg: "Internal Server Error" });
  }
});

// Route to get all artists
router.get("/getAll", async (req, res) => {
  try {
    const cursor = await artist.find();

    if (cursor) {
      // Artists found
      res.status(200).send({ success: true, data: cursor });
    } else {
      // No artists found
      res.status(200).send({ success: true, msg: "No Data Found" });
    }
  } catch (error) {
    // Error occurred while fetching the artists
    res.status(500).send({ success: false, msg: "Internal Server Error" });
  }
});

// Route to update an artist
router.put("/update/:updateId", async (req, res) => {
  try {
    const filter = { _id: req.params.updateId };
    const options = {
      upsert: true,
      new: true,
    };

    // Update the artist
    const result = await artist.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
      },
      options
    );

    // Respond with the updated artist
    res.status(200).send({ artist: result });
  } catch (error) {
    // Error occurred while updating the artist
    res.status(400).send({ success: false, msg: error });
  }
});

// Route to delete an artist
router.delete("/delete/:deleteId", async (req, res) => {
  try {
    const filter = { _id: req.params.deleteId };

    // Delete the artist
    const result = await artist.deleteOne(filter);

    if (result.deletedCount === 1) {
      // Artist deleted
      res.status(200).send({ success: true, msg: "Data Deleted", data: result });
    } else {
      // Artist not found
      res.status(200).send({ success: false, msg: "Data Not Found" });
    }
  } catch (error) {
    // Error occurred while deleting the artist
    res.status(400).send({ success: false, msg: error });
  }
});

module.exports = router;
