const addValues = (arg1, arg2) => {
    if ((typeof(arg1) === "bigint" || (typeof(arg1) === "number" && !isNaN(arg1)))
    && (typeof(arg2) === "bigint" || (typeof(arg2) === "number" && !isNaN(arg2)))) {
        return BigInt(arg1) + BigInt(arg2)
    }
    if (typeof(arg1) === "string" 
    && typeof(arg2) === "string") {
        return arg1 + arg2
    }
    if (typeof(arg1) === "symbol" && typeof(arg2) === "symbol") {
        if (arg1.description === undefined || arg2.description === undefined) {
            throw new Error("Either arg1 or arg2 symbol is undefined")
        }
        return Symbol(arg1.description + arg2.description)
    }
    throw new Error("Both Arg1 and arg2 are not in string, number, bigint or symbol")
}

const stringyfyValue = (arg) => {
    if (typeof(arg) === "undefined") {
        throw new Error("Unable convert undefined value to string")
    }
    if (typeof(arg) === "object") {
        return JSON.stringify(arg)
    } else {
        return arg.toString()
    }
}

const invertBoolean = (bool) => {
    if (typeof(bool) !== "boolean") {
        throw new Error("Argument is not a boolean type")
    }
    return !bool
}

const convertToNumber = (arg) => {
    if (typeof(arg) === "string" && !isNaN(Number.parseFloat(arg))) {
        return Number.parseFloat(arg)
    }
    if (typeof(arg) === "boolean" 
    || typeof(arg) === "symbol" && !isNaN(+arg.description)) {
        return +arg
    }
    if (typeof(arg) === "bigint" 
    || typeof(arg) === "number" && !isNaN(arg)) {
        return arg
    }
    throw new Error("Unable convert to number")
}

const coerceToType = (arg, type) => {
    switch (type) {
        case 'bigint':
            let value = convertToNumber(arg)
            return BigInt(value)
        case 'string':
            return stringifyValue(arg)
        case 'boolean':
            return convertToBoolean(arg)
        case 'symbol':
            return Symbol(arg)
        case 'number':
            return convertToNumber(arg)
        case 'object':
            if (typeof(arg) !== 'object') {
                throw new Error("Unable coerce to type")
            }
            return arg
        case 'undefined':
            if (typeof(arg) !== 'undefined') {
                throw new Error("Unable coerce to type")
            }
            return arg
        default:
            throw new Error("Unable coerce to type")
    }
}

export {addValues, coerceToType, invertBoolean, convertToNumber, stringyfyValue}