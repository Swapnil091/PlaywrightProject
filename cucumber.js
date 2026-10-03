module.exports = {
  default: {
    paths: ['features/login.feature'],
    requireModule: ['tsx/cjs'],
    require: ['features/support/**/*.ts', 'features/step-definitions/**/*.ts'],
    format: ['progress', 'html:reports/cucumber-report.html'],
    parallel: 1,
    publishQuiet: true,
  },
};