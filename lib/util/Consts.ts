import * as RDF from 'rdf-data-model';
import { DefaultGraph, Literal } from 'rdf-js';

export const TRUE_STR = '"true"^^xsd:boolean';
export const FALSE_STR = '"false"^^xsd:boolean';
export const EVB_ERR_STR = '"not an integer"^^xsd:integer';

export enum DataType {
  XSD_STRING = 'http://www.w3.org/2001/XMLSchema#string',
  RDF_LANG_STRING = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString',

  XSD_BOOLEAN = 'http://www.w3.org/2001/XMLSchema#boolean',

  XSD_DATE_TIME = 'http://www.w3.org/2001/XMLSchema#dateTime',

  // Numeric types
  XSD_INTEGER = 'http://www.w3.org/2001/XMLSchema#integer',
  XSD_DECIMAL = 'http://www.w3.org/2001/XMLSchema#decimal',
  XSD_FLOAT = 'http://www.w3.org/2001/XMLSchema#float',
  XSD_DOUBLE = 'http://www.w3.org/2001/XMLSchema#double',

  // Derived numeric types
  XSD_NON_POSITIVE_INTEGER = 'http://www.w3.org/2001/XMLSchema#nonPositiveInteger',
  XSD_NEGATIVE_INTEGER = 'http://www.w3.org/2001/XMLSchema#negativeInteger',
  XSD_LONG = 'http://www.w3.org/2001/XMLSchema#long',
  XSD_INT = 'http://www.w3.org/2001/XMLSchema#int',
  XSD_SHORT = 'http://www.w3.org/2001/XMLSchema#short',
  XSD_BYTE = 'http://www.w3.org/2001/XMLSchema#byte',
  XSD_NON_NEGATIVE_INTEGER = 'http://www.w3.org/2001/XMLSchema#nonNegativeInteger',
  XSD_UNSIGNED_LONG = 'http://www.w3.org/2001/XMLSchema#unsignedLong',
  XSD_UNSIGNED_INT = 'http://www.w3.org/2001/XMLSchema#unsignedInt',
  XSD_UNSIGNED_SHORT = 'http://www.w3.org/2001/XMLSchema#unsignedShort',
  XSD_UNSIGNED_BYTE = 'http://www.w3.org/2001/XMLSchema#unsignedByte',
  XSD_POSITIVE_INTEGER = 'http://www.w3.org/2001/XMLSchema#positiveInteger',
}

// https://www.w3.org/TR/sparql11-query/#operandDataTypes
export enum NumericType {
  XSD_INTEGER = DataType.XSD_INTEGER,
  XSD_DECIMAL = DataType.XSD_DECIMAL,
  XSD_FLOAT = DataType.XSD_FLOAT,
  XSD_DOUBLE = DataType.XSD_DOUBLE,
  XSD_NON_POSITIVE_INTEGER = DataType.XSD_NON_POSITIVE_INTEGER,
  XSD_NEGATIVE_INTEGER = DataType.XSD_NEGATIVE_INTEGER,
  XSD_LONG = DataType.XSD_LONG,
  XSD_INT = DataType.XSD_INT,
  XSD_SHORT = DataType.XSD_SHORT,
  XSD_BYTE = DataType.XSD_BYTE,
  XSD_NON_NEGATIVE_INTEGER = DataType.XSD_NON_NEGATIVE_INTEGER,
  XSD_UNSIGNED_LONG = DataType.XSD_UNSIGNED_LONG,
  XSD_UNSIGNED_INT = DataType.XSD_UNSIGNED_INT,
  XSD_UNSIGNED_SHORT = DataType.XSD_UNSIGNED_SHORT,
  XSD_UNSIGNED_BYTE = DataType.XSD_UNSIGNED_BYTE,
  XSD_POSITIVE_INTEGER = DataType.XSD_POSITIVE_INTEGER,
}

export type DataTypeCategory =
  'string'
  | 'date'
  | 'boolean'
  | 'simple'
  | 'other'
  | 'integer'
  | 'decimal'
  | 'float'
  | 'double';

export function categorize(dataType: string): DataTypeCategory {
  switch (dataType) {
    case null:
    case undefined:
    case "": return 'simple';
    case DataType.XSD_STRING:
    case DataType.RDF_LANG_STRING: return 'string';
    case DataType.XSD_DATE_TIME: return 'date';
    case DataType.XSD_BOOLEAN: return 'boolean';


    case DataType.XSD_DECIMAL: return 'decimal';
    case DataType.XSD_FLOAT: return 'float';
    case DataType.XSD_DOUBLE: return 'double';
    case DataType.XSD_INTEGER:
    case DataType.XSD_NON_POSITIVE_INTEGER:
    case DataType.XSD_NEGATIVE_INTEGER:
    case DataType.XSD_LONG:
    case DataType.XSD_INT:
    case DataType.XSD_SHORT:
    case DataType.XSD_BYTE:
    case DataType.XSD_NON_NEGATIVE_INTEGER:
    case DataType.XSD_UNSIGNED_LONG:
    case DataType.XSD_UNSIGNED_INT:
    case DataType.XSD_UNSIGNED_SHORT:
    case DataType.XSD_UNSIGNED_BYTE:
    case DataType.XSD_POSITIVE_INTEGER: return 'integer';
    default: return 'other';
  }
}

// If datatypes get lost or lose specificity during operations, we can insert a
// concrete type, since categories should remain the same. This mostly (only)
// relevant for integer subtypes. 
const _decategorize = new Map<DataTypeCategory, DataType>([
  ['integer', DataType.XSD_INTEGER],
  ['float', DataType.XSD_FLOAT],
  ['double', DataType.XSD_DOUBLE],
  ['decimal', DataType.XSD_DECIMAL],
])

export function decategorize(cat: DataTypeCategory): DataType {
  return _decategorize.get(cat)
}

// TODO: Operator enum (with special operators)
export enum Operator {
  AND = '&&',
  OR = '||',
  EQUAL = '=',
  NOT_EQUAL = '!=',
  LT = '<',
  GT = '>',
  LTE = '<=',
  GTE = '>=',
  MULTIPLICATION = '*',
  DIVISION = '/',
  ADDITION = '+',
  SUBTRACTION = '-',
}

export enum OverloadedOperator {
  EQUAL = Operator.EQUAL,
  NOT_EQUAL = Operator.NOT_EQUAL,
  LT = Operator.LT,
  GT = Operator.GT,
  LTE = Operator.LTE,
  GTE = Operator.GTE,

  MULTIPLICATION = Operator.MULTIPLICATION,
  DIVISION = Operator.DIVISION,
  ADDITION = Operator.ADDITION,
  SUBTRACTION = Operator.SUBTRACTION,
}

export enum SpecialOperator {
  AND = Operator.AND,
  OR = Operator.OR,
}

