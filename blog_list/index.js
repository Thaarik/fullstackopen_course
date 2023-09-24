require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const logger = require("./utils/logger");
const config = require("./utils/config");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");

const url = config.MONGODB_URI;
mongoose.connect(url).then(()=>logger.info('Connected to MongoDB')).catch(error=>logger.error('error connecting to MongoDB:',error.message));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/blogs", blogsRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
