Problem = class {
  constructor(
    {
        title,
        statement,
        inputFormat,
        outputFormat,
        constraints,
        samples
    }
  ) {
    this.title = title;
    this.statement = statement;
    this.constraints = constraints;
    this.inputFormat = inputFormat;
    this.outputFormat = outputFormat;
    this.samples = samples;
  }
};

module.exports = Problem;
