import nextJest from 'next/jest'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
    '\\.module\\.(css|sass|scss)$': '<rootDir>/test/__mocks__/styleMock.js',
    '\\.(css|sass|scss)$': '<rootDir>/test/__mocks__/styleMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/src/jestSetup.ts'],
  testEnvironment: 'jest-environment-jsdom',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
