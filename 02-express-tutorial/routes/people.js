const express = require("express");
const router = express.Router();

const {
  getPeople,
  addPerson,
  addPersonPostman,
  updatePerson,
  deletePerson,
} = require("../controllers/people.js"); // Importing controller functions

/* firat way to define routes
  router.get("/", getPeople); // GET request to fetch all people
  router.post("/", addPerson); // POST request to create a new person
  router.post("/postman", addPersonPostman); // POST request to create a new person using Postman
  router.put("/:id", updatePerson); // PUT request to update a person by ID
  router.delete("/:id", deletePerson); // DELETE request to delete a person by ID
*/

// Second way to define routes using chaining
router.route("/").get(getPeople).post(addPerson); // Chaining GET and POST requests to the same route
router.route("/postman").post(addPersonPostman); // Chaining POST request to the same route
router.route("/:id").put(updatePerson).delete(deletePerson); // Chaining PUT and DELETE requests to the same route

module.exports = router;
