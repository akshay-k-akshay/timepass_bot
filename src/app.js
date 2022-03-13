const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const { config, logger, morganOption } = require("./config");

const port = config.get("app.port");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(helmet());
app.use(morgan("combined", morganOption));

// routes
app.use("/files", express.static(path.join(__dirname , "../files")));

app.listen(port, () => {
    logger.info(`App listening at http://localhost:${port}`);
});
