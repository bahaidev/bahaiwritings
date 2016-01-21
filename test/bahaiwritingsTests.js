
var bahaiwritingsTests = {
    'basic test': function (test) {
        test.expect(1);

        var expected = '';
        var result = '';
        test.deepEqual(expected, result);
        test.done();
    }
};

if (typeof exports !== 'undefined') {
    module.exports = bahaiwritingsTests;
}
