const assert = require('assert');
const Module = require('module');

describe('preload ping', function () {
  it('returns pong', async function () {
    const electronMock = {
      ipcRenderer: {
        invoke: async (channel) => {
          assert.strictEqual(channel, 'ping');
          return 'pong';
        }
      },
      contextBridge: {
        exposeInMainWorld: (key, api) => {
          global[key] = api;
        }
      }
    };

    const originalLoad = Module._load;
    Module._load = function (request, parent, isMain) {
      if (request === 'electron') {
        return electronMock;
      }
      return originalLoad(request, parent, isMain);
    };

    delete require.cache[require.resolve('../preload.js')];
    require('../preload.js');
    Module._load = originalLoad;

    const result = await global.versions.ping();
    assert.strictEqual(result, 'pong');
  });
});
