"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: ['**/*.spec.ts'],
    moduleFileExtensions: ['ts', 'js'],
};
exports.default = config;
