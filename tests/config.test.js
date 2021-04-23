import { config } from '../src'

describe('config()', () => {
  const processEnv = Object.assign({}, process.env)
  let processCwdSpy

  beforeEach(() => {
    processCwdSpy = jest.spyOn(process, 'cwd')
  })

  afterEach(() => {
    processCwdSpy.mockRestore()

    process.env = processEnv
  })

  test('correclty parse .env file', () => {
    processCwdSpy.mockReturnValue('tests')

    config()

    expect(process.env).toMatchObject({
      VARIABLE: 'variable_value',
      SINGLE_QUOTED_VARIABLE: 'single quoted variable value',
      DOUBLE_QUOTED_VARIABLE: 'double quoted variable value',
      EMPTY_VARIABLE: '',
      OBJECT_VARIABLE: '{"foo": "bar"}'
    })
  })

  test('correclty parse .env & .env.defaults file', () => {
    processCwdSpy.mockReturnValue('tests/defaults')

    config()

    expect(process.env).toMatchObject({
      VARIABLE: 'overwritten_variable_value',
      SINGLE_QUOTED_VARIABLE: 'single quoted variable value',
      DOUBLE_QUOTED_VARIABLE: 'double quoted variable value',
      EMPTY_VARIABLE: '',
      OBJECT_VARIABLE: '{"foo": "bar"}',
      NEW_VARIABLE: 'new_variable_value'
    })
  })

  test('correclty takes process.env vars ', () => {
    processCwdSpy.mockReturnValue('tests/defaults')

    process.env.VARIABLE = 'new value'

    config()

    expect(process.env).toMatchObject({
      VARIABLE: 'new value',
      SINGLE_QUOTED_VARIABLE: 'single quoted variable value',
      DOUBLE_QUOTED_VARIABLE: 'double quoted variable value',
      EMPTY_VARIABLE: '',
      OBJECT_VARIABLE: '{"foo": "bar"}',
      NEW_VARIABLE: 'new_variable_value'
    })
  })
})
