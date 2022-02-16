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

export default {
    slugify,
    alphabetize,
}