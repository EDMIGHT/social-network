// @ts-check

module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  // setupFilesAfterEnv: ['./src/setupTests.ts'],
  verbose: true,
  forceExit: true,
  // clearMocks: true

  /* for the operation of ECM modules */
  moduleFileExtensions: ['js', 'js', 'ts', 'ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testMatch: ['**/**/*.test.ts'],

  /* remove TS errors when running tests */
  globals: {
    'ts-jest': {
      isolatedModules: true,
      diagnostics: false,
    },
  },
};
