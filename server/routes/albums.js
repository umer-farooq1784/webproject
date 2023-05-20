const router = require("express").Router();

const album = require("../models/album");

// Route to get all albums
router.get("/getAll", async (req, res) => {
  try {
    // Find all albums
    const cursor = await album.find();

    if (cursor) {
      // Albums found
      res.status(200).send({ success: true, data: cursor });
    } else {
      // No albums found
      res.status(200).send({ success: true, msg: "No Data Found" });
    }
  } catch (error) {
    // Error occurred while fetching albums
    res.status(500).send({ success: false, msg: "Internal Server Error" });
  }
});

// Route to save a new album
router.post("/save", async (req, res) => {
  try {
    // Create a new album object
    const newAlbum = album({
      name: req.body.name,
      imageURL: req.body.imageURL,
    });

    // Save the new album to the database
    const savedAlbum = await newAlbum.save();

    // Respond with the saved album
    res.status(200).send({ album: savedAlbum });
  } catch (error) {
    // Error occurred while saving the album
    res.status(400).send({ success: false, msg: error });
  }
});

// Route to get a single album by ID
router.get("/getOne/:getOne", async (req, res) => {
  try {
    const filter = { _id: req.params.getOne };

    // Find the album by ID
    const cursor = await album.findOne(filter);
    console.log(cursor);

    if (cursor) {
      // Album found
      res.status(200).send({ success: true, data: cursor });
    } else {
      // Album not found
      res.status(200).send({ success: true, msg: "No Data Found" });
    }
  } catch (error) {
    // Error occurred while fetching the album
    res.status(500).send({ success: false, msg: "Internal Server Error" });
  }
});

// Route to update an album
router.put("/update/:updateId", async (req, res) => {
  try {
    const filter = { _id: req.params.updateId };
    const options = {
      upsert: true,
      new: true,
    };

    // Update the album
    const result = await album.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
      },
      options
    );

    // Respond with the updated album
    res.status(200).send({ album: result });
  } catch (error) {
    // Error occurred while updating the album
    res.status(400).send({ success: false, msg: error });
  }
});

// Route to delete an album
router.delete("/delete/:deleteId", async (req, res) => {
  try {
    const filter = { _id: req.params.deleteId };

    // Delete the album
    const result = await album.deleteOne(filter);

    if (result.deletedCount === 1) {
      // Album deleted
      res.status(200).send({ success: true, msg: "Data Deleted" });
    } else {
      // Album not found
      res.status(200).send({ success: false, msg: "Data Not Found" });
    }
  } catch (error) {
    // Error occurred while deleting the album
    res.status(400).send({ success: false, msg: error });
  }
});

module.exports = router;
