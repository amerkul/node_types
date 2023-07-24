import {addValues, coerceToType, convertToNumber, invertBoolean, stringyfyValue} from './module.js'

console.log(addValues(1n, 1))
console.log(stringyfyValue(Infinity))
console.log(invertBoolean(false))
console.log(convertToNumber("11"))
console.log(coerceToType(NaN, "symbol"))
