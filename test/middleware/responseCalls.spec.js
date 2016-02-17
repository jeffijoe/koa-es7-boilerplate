import responseCalls from 'middleware/responseCalls';

describe('responseCalls middleware', function() {
  it('adds methods to the context', async function() {
    const ctx = {};
    const next = sinon.spy();
    await responseCalls(ctx, next);
    expect(ctx.ok).to.exist;
    expect(ctx.forbidden).to.exist;
    expect(ctx.unauthorized).to.exist;
    expect(ctx.notFound).to.exist;
    expect(ctx.error).to.exist;
    expect(ctx.badRequest).to.exist;
    next.should.have.been.calledOnce;
  });
});
