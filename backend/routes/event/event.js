const router = require("express").Router();

router.get("/", async (req, res) => {});

router.post("/", async (req, res) => {
  const newEvent = await new Event(req.body);
  try {
    await newEvent.save((err, event) => {
      if (err) {
        handleError(err, res);
      } else {
        res.status(200).json(event);
      }
    });
  } catch (err) {
    handleError(err, res);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const event = await Event.findOne({ _id: id });
    if (event) {
      Object.assign(event, req.body);
      event.save((err, event) => {
        if (err) {
          handleError(err, res);
        } else {
          res.status(200).json(event);
        }
      });
    }
    if (!event) {
      res.status(404).json({ error: "event is not found" });
    }
  } catch (err) {
    console.log(err);
    handleError(err, res);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Event.findByIdAndRemove(id);
    res.status(200).json("Event has been deleted");
  } catch (err) {
    handleError(err, res);
  }
});

module.exports = router;
