import getModules from 'lib/getModules';

describe('getModules', function() {
  it('returns the correct map of modules', async function() {
    const actual = await getModules(__dirname, '../../src/lib/**/*.js');
    expect(actual.find(x => x.name === 'getModules')).to.be.ok;
  });
});