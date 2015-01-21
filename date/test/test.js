
require("../src/date.js");
console.log(new Date().is())
function Cow() {
    this.mowed = false;
    this.moo = function moo() {
        this.mowed = true; // mootable state: don't do that at home
        return 'moo!';
    };
}

casper.test.begin('Cow can moo', 2, function suite(test) {
    var cow = new Cow();
    test.assertEquals(cow.moo(), 'moo!');
    test.assert(cow.mowed);
    test.done();
});