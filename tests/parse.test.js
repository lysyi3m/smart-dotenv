import { readFileSync } from 'fs'

import { parse } from '../src'

describe('parse()', () => {
  test('correctly parse .env file', () => {
    const parsed = parse(readFileSync('tests/.env', { encoding: 'utf8' }))

    expect(parsed).toMatchObject({
      VARIABLE: 'variable_value',
      SINGLE_QUOTED_VARIABLE: 'single quoted variable value',
      DOUBLE_QUOTED_VARIABLE: 'double quoted variable value',
      EMPTY_VARIABLE: '',
      OBJECT_VARIABLE: '{"foo": "bar"}'
    })
  })

  test('correctly parse string', () => {
    const string = "SOME_VARIABLE='value'"

    const parsed = parse(string)

    expect(parsed).toMatchObject({
      SOME_VARIABLE: 'value'
    })
  })

  test('correctly parse Buffer', () => {
    const buffer = Buffer.from("SOME_VARIABLE='value'")

    const parsed = parse(buffer)

    expect(parsed).toMatchObject({
      SOME_VARIABLE: 'value'
    })
  })

  test('correctly parse erroneous .env file', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()

    const parsed = parse(readFileSync('tests/.env.error', { encoding: 'utf8' }), { debug: true })

    expect(console.log).toHaveBeenLastCalledWith('[dotenv] parse error on line 11: #erroneousEntry')

    expect(parsed).toMatchObject({
      VARIABLE: 'variable_value',
      SINGLE_QUOTED_VARIABLE: 'single quoted variable value',
      DOUBLE_QUOTED_VARIABLE: 'double quoted variable value',
      EMPTY_VARIABLE: '',
      OBJECT_VARIABLE: '{"foo": "bar"}'
    })

    consoleLogSpy.mockRestore()
  })
})
