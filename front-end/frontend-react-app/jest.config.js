/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverageFrom: ["src/**/*.tsx", "!**/node_modules/**"],
  coverageReporters: ["html", "text", "text-summary", "cobertura", "lcov"],
  testMatch: ["**/*.test.tsx"]
};