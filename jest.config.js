/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/test'], 
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};

module.exports = config;
