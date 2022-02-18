const slugify = function(str) {
    str = str.replace(/^\s+|\s+$/g, ""); // trim
      str = str.toLowerCase();

    // substitute special characters
    var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaaaeeeeiiiioooouuuunc------";

    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
        .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        .replace(/-+/g, "-") // collapse dashes
        .replace(/^-+/, "") // trim - from start of text
        .replace(/-+$/, ""); // trim - from end of text

    return str;
}

// alphabetize an array of strings, OR
// if key is specified, an array of objects by the value of that key
const alphabetize = function(array, key) {
    return array.sort(function(a, b) {
        var itemA = key ? a[key].toUpperCase() : a.toUpperCase()
        var itemB = key ? b[key].toUpperCase() : b.toUpperCase()
        return (itemA < itemB) ? -1 : (itemA > itemB) ? 1 : 0
    })
}


// use a non-linear Caesar cipher to make the downloaded json unreadable
// ** this is not an encoding, and isn't secure **, it's just less awkward
// if your mom opens your downloaded file
// thanks to https://medium.com/@TimSeverien/substitution-cipher-in-javascript-d530eb2d923d
const cipherRotate = function(text, key, reverse) {
    var bound = 0x10000;

    return String.fromCharCode.apply(null,
        text.split('').map(function(v, i) {
            var rotation = key[i % key.length].charCodeAt()
            if(reverse) rotation = -rotation
            return (v.charCodeAt() + rotation + bound) % bound
        })
    )
}
const obfuscate = function (text) {
    return cipherRotate(text, "organDonorBrotherGangStrikesAgain");
}
const deobfuscate = function (encoded) {
    return cipherRotate(encoded, "organDonorBrotherGangStrikesAgain", true);
}

export default {
    slugify,
    alphabetize,
    obfuscate,
    deobfuscate
}