const { getClientJs } = require('../utils')

describe('Can pull JavaScript file', () => {
  test('returns js file if it exists', () => {
    const req = {
      body: {},
      headers: { host: 'localhost' },
    }
    expect(getClientJs(req, 'start')).toEqual("http://localhost/js/dist/start.f1ed5571f87447db4459.js")
  })
})
