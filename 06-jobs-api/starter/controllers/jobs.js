// Import the Job model to interact with the jobs collection
const Job = require("../models/Job");
// Import HTTP status codes for consistent responses
const { StatusCodes } = require("http-status-codes");
// Import custom error classes for error handling
const { BadRequestError, NotFoundError } = require("../errors");

// Controller to get all jobs created by the authenticated user
const getAllJobs = async (req, res) => {
  // Find all jobs where createdBy matches the user's ID, sorted by creation date
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  // Respond with the jobs and the count
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

// Controller to get a single job by ID for the authenticated user
const getJob = async (req, res) => {
  // Destructure userId and jobId from the request
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  // Find the job by ID and createdBy
  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  // If job not found, throw a NotFoundError
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  // Respond with the found job
  res.status(StatusCodes.OK).json({ job });
};

// Controller to create a new job for the authenticated user
const createJob = async (req, res) => {
  // Add the user's ID to the job data
  const job = await Job.create({
    ...req.body,
    createdBy: req.user.userId,
  });
  // Respond with the created job
  res.status(StatusCodes.CREATED).json({ job });
};

// Controller to update an existing job for the authenticated user
const updateJob = async (req, res) => {
  // Destructure company, position, userId, and jobId from the request
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;
  // Validate that company and position are not empty
  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }

  // Find and update the job by ID and createdBy, return the new document
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  // If job not found, throw a NotFoundError
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  // Respond with the updated job
  res.status(StatusCodes.OK).json({ job });
};

// Controller to delete a job for the authenticated user
const deleteJob = async (req, res) => {
  // Destructure userId and jobId from the request
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  // Find and remove the job by ID and createdBy
  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  });
  // If job not found, throw a NotFoundError
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  // Respond with a success message
  res.status(StatusCodes.OK).json({ msg: "Success! Job removed" });
};

// Export all job controllers for use in routes
module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
