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
    '^src/(.*)$': '<rootDir>/src/$1',
    // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }), // deprecated?
    '^@/controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^@/db/(.*)$': '<rootDir>/src/db/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/middleware/(.*)$': '<rootDir>/src/middleware/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/docs/(.*)$': '<rootDir>/src/docs/$1',
    '^@/services/(.*)$': '<rootDir>/src/services/$1',
    '^@/routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@/models/(.*)$': '<rootDir>/src/models/$1',
    '^@/utils/validators$': '<rootDir>/src/utils/validators',
    '^@/utils/helpers/(.*)$': '<rootDir>/src/utils/helpers/$1',
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
