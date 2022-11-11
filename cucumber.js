const command = [
  '--require-module ts-node/register',
  'test/e2e/features/**/*.feature',
  '--require test/e2e/steps-definitions/**.steps.ts',
  '--publish-quiet',
].join(' ');

module.exports = {
  default: command,
};
