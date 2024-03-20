export default {
    testEnvironment: 'node',
    roots: ['./src', './tests'],
    preset: 'ts-jest',
    silent: false,
    verbose: true,
    collectCoverageFrom: ['src/**'],
    coverageReporters: ['text'],
    coverageThreshold: {
        global: {
            branches: 85,
            functions: 85,
            lines: 85,
            statements: -10,
        }
    },
    transform: {
        '\\.[jt]sx?$': 'babel-jest',
    },
};