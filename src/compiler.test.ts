import {
  AST,
  codeGenerator,
  compiler,
  parser,
  Token,
  tokenizer,
  transformer,
} from './compiler';

const input = '(add 2 (subtract 4 2))';
const output = 'add(2, subtract(4, 2));';

const tokens: Token[] = [
  { type: 'paren', value: '(' },
  { type: 'name', value: 'add' },
  { type: 'number', value: '2' },
  { type: 'paren', value: '(' },
  { type: 'name', value: 'subtract' },
  { type: 'number', value: '4' },
  { type: 'number', value: '2' },
  { type: 'paren', value: ')' },
  { type: 'paren', value: ')' },
];

const ast: AST = {
  type: 'Program',
  _context: [],
  body: [{
    type: 'CallExpression',
    name: 'add',
    _context: [],
    params: [{
      type: 'NumberLiteral',
      value: '2',
      _context: [],
    }, {
      type: 'CallExpression',
      name: 'subtract',
      _context: [],
      params: [{
        type: 'NumberLiteral',
        value: '4',
        _context: [],
      }, {
        type: 'NumberLiteral',
        value: '2',
        _context: [],
      }],
    }],
  }],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const newAst: any = {
  type: 'Program',
  body: [{
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'Identifier',
        name: 'add',
      },
      arguments: [{
        type: 'NumberLiteral',
        value: '2',
      }, {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: 'subtract',
        },
        arguments: [{
          type: 'NumberLiteral',
          value: '4',
        }, {
          type: 'NumberLiteral',
          value: '2',
        }],
      }],
    },
  }],
};

describe('compiler', () => {
  describe('tokenizer', () => {
    test('Tokenizer should turn `input` string into `tokens` array', () => {
      expect(tokenizer(input)).toEqual(tokens);
    });
  });
  describe('parser', () => {
    test('Parser should turn `tokens` array into `ast`', () => {
      expect(parser(tokens)).toEqual(ast);
    });
  });
  describe('transformer', () => {
    test('Transformer should turn `ast` into a `newAst`', () => {
      expect(transformer(ast)).toEqual(newAst);
    });
  });
  describe('codeGenerator', () => {
    test('Code Generator should turn `newAst` into `output` string', () => {
      expect(codeGenerator(newAst)).toEqual(output);
    });
  });
  describe('compiler', () => {
    test('Compiler should turn `input` into `output`', () => {
      expect(compiler(input)).toEqual(output);
    });
  });
});
