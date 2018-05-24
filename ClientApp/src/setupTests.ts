// tslint:disable-next-line:no-var-requires
const fs = require("fs");
// tslint:disable-next-line:no-var-requires
const path = require("path");
// tslint:disable-next-line:no-var-requires
const dotnetify = require("dotnetify");
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
  };
global.localStorage = localStorageMock;
Object.defineProperty(dotnetify.react, "connect", {
    value: () => {
        return () => { };
    }
});
