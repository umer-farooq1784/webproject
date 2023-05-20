const router = require("express").Router();

const song = require("../models/song");

// Route to get all songs
router.get("/getAll", async (req, res) => {
  try {
    const cursor = await song.find();

    if (cursor) {
      // Songs found
      res.status(200).send({ success: true, data: cursor });
    } else {
      // No songs found
      res.status(200).send({ success: true, msg: "No Data Found" });
    }
  } catch (error) {
    // Error occurred while fetching the songs
    res.status(500).send({ success: false, msg: "Internal Server Error" });
  }
});

// Route to get a single song by ID
router.get("/getOne/:getOne", async (req, res) => {
  try {
    const filter = { _id: req.params.getOne };

    // Find the song by ID
    const cursor = await song.findOne(filter);

    if (cursor) {
      // Song found
      res.status(200).send({ success: true, data: cursor });
    } else {
      // Song not found
      res.status(200).send({ success: true, msg: "No Data Found" });
    }
  } catch (error) {
    // Error occurred while fetching the song
    res.status(500).send({ success: false, msg: "Internal Server Error" });
  }
});

// Route to save a new song
router.post("/save", async (req, res) => {
  try {
    const newSong = song({
      name: req.body.name,
      imageURL: req.body.imageURL,
      songUrl: req.body.songUrl,
      album: req.body.album,
      artist: req.body.artist,
      language: req.body.language,
      category: req.body.category,
    });

    // Save the new song to the database
    const savedSong = await newSong.save();

    // Respond with the saved song
    res.status(200).send({ song: savedSong });
  } catch (error) {
    // Error occurred while saving the song
    res.status(400).send({ success: false, msg: error });
  }
});

// Route to update a song
router.put("/update/:updateId", async (req, res) => {
  try {
    const filter = { _id: req.params.updateId };
    const options = {
      upsert: true,
      new: true,
    };

    // Update the song
    const result = await song.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        songUrl: req.body.songUrl,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
      },
      options
    );

    // Respond with the updated song
    res.status(200).send({ artist: result });
  } catch (error) {
    // Error occurred while updating the song
    res.status(400).send({ success: false, msg: error });
  }
});

// Route to delete a song
router.delete("/delete/:deleteId", async (req, res) => {
  try {
    const filter = { _id: req.params.deleteId };

    // Delete the song
    const result = await song.deleteOne(filter);

    if (result.deletedCount === 1) {
      // Song deleted
      res.status(200).send({ success: true, msg: "Data Deleted" });
    } else {
      // Song not found
      res.status(200).send({ success: false, msg: "Data Not Found" });
    }
  } catch (error) {
    // Error occurred while deleting the song
    res.status(400).send({ success: false, msg: error });
  }
});

// Route to get favorite songs
router.get("/getFavouritesSongs", async (req, res) => {
  const query = req.query.songId;
  res.send(query);
});

module.exports = router;
