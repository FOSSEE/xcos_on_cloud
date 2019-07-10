/*jshint browserify:true, bitwise:false */
'use strict';

var isSpace = function(c) {
    c = c.charCodeAt(0);
    return ((c>=0x09 && c<=0x0D) || (c===0x20));
};

var InputIterator = function(input) {
    this.input = input;

    this.position = 0;
    this.length = input.length;
};

InputIterator.prototype._ended = function() {
    return (this.position >= this.length);
};

InputIterator.prototype._current = function() {
    if (this._ended()) {
        return '';
    }

    return this.input[this.position];
};

InputIterator.prototype._next = function() {
    this.position += 1;
};

InputIterator.prototype._setMismatch = function() {
    // don't parse rest of input on character mismatch
    this.position = this.length;
};

InputIterator.prototype.match = function(s) {
    for (var i = 0; i < s.length; i += 1) {
        this.matchCharacter(s.charAt(i));
    }
};

InputIterator.prototype.matchCharacter = function(c) {
    if (this._ended()) {
        return;
    }

    if (isSpace(c)) {
        this.matchSpace();
    }
    else {
        this.matchExactly(c);
    }
};

InputIterator.prototype.matchSpace = function() {
    while (!this._ended() && isSpace(this._current())) {
        this._next();
    }
};

InputIterator.prototype.matchExactly = function(c) {
    if (this._ended()) {
        return;
    }

    if (this._current() !== c) {
        this._setMismatch();
    }
    else {
        this._next();
    }
};

InputIterator.prototype.matchRegex = function(regex, maxWidth) {
    if (this._ended()) {
        return null;
    }

    var m = regex.exec(this.input.substring(this.position));
    var matchText;

    if (m === null) {
        this._setMismatch();
        return null;
    }
    else {
        matchText = m[0];

        if (maxWidth !== null) {
            maxWidth = Math.min(maxWidth, matchText.length);
            matchText = matchText.substring(0, maxWidth);
        } 

        this.position += matchText.length;
        return matchText;
    }
};

InputIterator.prototype.startsWith = function(regex) {
    if (this._ended()) {
        return false;
    }

    var result = regex.test(this.input.substring(this.position));
    return result;
};

InputIterator.prototype.toString = function() {
    if (this._ended()) {
        return '<<EOF>>';
    }
    else {
        return this.input.substring(this.index);
    }
};

var addResult = function(result, name, value) {
    if (name !== undefined) {
        result.named = (result.named || {});

        var propertyNames = name.split('.');
        var obj = result.named;

        // for path property names like foo.bar.nyu
        // traverse result object tree and create objects when
        // necessary
        for (var i = 0; i < propertyNames.length - 1; i += 1) {
            obj = obj[propertyNames[i]] = (obj[propertyNames[i]] || {});
        }
        obj[propertyNames[propertyNames.length-1]] = value;
    }
    else {
        result.positional = (result.positional || []);
        result.positional.push(value);
    }
};

var scansetToRegex = (function() {
    var ASCII_CODE = {
        DIGIT_ZERO: '0'.charCodeAt(0),
        DIGIT_NINE: '9'.charCodeAt(0),
        SMALL_A: 'a'.charCodeAt(0),
        SMALL_Z: 'z'.charCodeAt(0),
        CAPITAL_A: 'A'.charCodeAt(0),
        CAPITAL_Z: 'Z'.charCodeAt(0)
    };

    var isSafe = function(c) {
        var code = c.charCodeAt(0);

        return (ASCII_CODE.DIGIT_ZERO <= code && code <= ASCII_CODE.DIGIT_NINE) ||
            (ASCII_CODE.SMALL_A <= code && code <= ASCII_CODE.SMALL_Z) ||
            (ASCII_CODE.CAPITAL_A <= code && code <= ASCII_CODE.CAPITAL_Z);
    };

    // convert char -> \uXXXX form
    var encode = function(c) {
        c = '0000' + c.charCodeAt(0).toString(16);
        return ('\\u' + c.slice(-4));
    };

    return function(scanset) {
        // remove [ and ] from ends of scanset
        scanset = scanset.slice(1, -1);
        
        var encoded = '';
        var position = 0;

        if (scanset[0] === '^') {
            // don't escape negation
            encoded += '^';
            position += 1;
        }

        for (; position < scanset.length; position += 1) {
            if (scanset[position] === '-') {
                // don't escape -
                encoded += '-';
            }
            else if (isSafe(scanset[position])) {
                // don't encode safe characters like letters
                encoded += scanset[position];
            }
            else {
                encoded += encode(scanset[position]);
            }
        }

        return new RegExp('^[' + encoded + ']+');
    };
}());

var parseArg = function(spec, width, name, input, result) {
    var skip, value, regex;

    skip = (width === '*');
    
    width = ( (!width || (width === '*')) ? null : Number(width) );
    if (width === 0) {
        // sscanf behaviour
        width = null;
    }

    switch (spec) {
    case '%':
        input.matchExactly('%');
        break;

    case 's':
        value = input.matchRegex(/^\S*/, width);
        break;

    case 'c':
        // in js regex (.) doesn't match new lines
        value = input.matchRegex(/^[\s\S]*/, width || 1);
        break;

    case 'i': 
    case 'd':
    case 'u':
    case 'x':
    case 'o':
        if ((spec === 'x') || ((spec === 'i') && input.startsWith(/^[-+]?0x|0X/))) {
            // hex number
            regex = (spec === 'i' ? 
                     /^[-+]?(0x|0X)[a-fA-F0-9]+/ : 
                     /^[-+]?(0x|0X)?[a-fA-F0-9]+/);

            value = input.matchRegex(regex, width);
            value =  parseInt(value, 16);
        }
        else if ((spec === 'o') || ((spec === 'i') && input.startsWith(/^[-+]?0\d/))) {
            // oct number
            regex = (spec === 'i' ? 
                     /^[-+]?0[0-7]+/ : 
                     /^[-+]?0?[0-7]+/);

            value = input.matchRegex(regex, width);
            value = parseInt(value, 8);
        }
        else {
            value = input.matchRegex(/^[+-]?\d+/, width);
            value = parseInt(value, 10);
        }
        
        if ((spec !== 'i' && spec !== 'd') && isFinite(value)) {
            // convert to unsigned
            value = (value >>> 0);
        }

        break;

    case 'f':
    case 'e':
    case 'g':
        if (input.startsWith(/^([-+]?Infinity|NaN)/i)) {
            value = input.matchRegex(/^([-+]?Infinity|NaN)/i, width);
            value = value.toLowerCase();
            
            if (value === 'nan') {
                value = Number.NaN;
            }
            else if (value === '+infinity' || value === 'infinity') {
                value = Number.POSITIVE_INFINITY;
            }
            else  {
                value = Number.NEGATIVE_INFINITY;
            }
        }
        else {
            value = input.matchRegex(/^[-+]?\d+(\.\d*)?((e|E)[-+]?\d+)?/, width);
            value = parseFloat(value);
        }
        break;

    default:
        if (spec.length === 1) {
            throw new Error('scan: unknown specifier: ' + spec);
        }
        else {
            // scanset: %3[rwx]
            regex = scansetToRegex(spec);
            value = input.matchRegex(regex, width);
        }
    }

    if (!skip) {
        addResult(result, name, value, skip);
    }
};

var scan = (function() {
    // %{name}10s or %d or %*d or %[rwx]
    var ARG_REGEX = /%(?:\{([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*)\})?(\*|\d+)?([a-z%]|\[[^\]]+\])/g;

    return function(input, format) {
        if (typeof(input) !== 'string') {
            throw new TypeError('scan: argument "input" must be a string');
        }

        if (typeof(format) !== 'string') {
            throw new TypeError('scan: argument "format" must be a string');
        }

        input = new InputIterator(input);

        var match, prevMatchEnd = 0;
        var result = {
            positional: null,
            named: null
        };

        var width, spec, name;

        ARG_REGEX.lastIndex = 0;
        while ((match = ARG_REGEX.exec(format)) !== null) {
            input.match(format.substring(prevMatchEnd, match.index));

            width = match[2];
            spec = match[3];
            name = match[1];
            parseArg(spec, width, name, input, result);

            prevMatchEnd = match.index + match[0].length;
        }

        return (result.positional ? result.positional : result.named);
    };

}());
