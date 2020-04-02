const {defaults} = require('jest-config');


module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/app/**/{!(app.module),}*.ts"],
};
