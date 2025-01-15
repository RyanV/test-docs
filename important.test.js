const consoleSpy = jest.spyOn(console, 'log');

describe('important.js', () => {
  beforeEach(() => {
    consoleSpy.mockClear();
  });

  it('should log hello when executed', () => {
    require('./important.js');
    expect(consoleSpy).toHaveBeenCalledWith('hello');
  });
}); 