import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const RE_NEWLINES = /\n|\r|\r\n/
const RE_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/
const RE_NEWLINE = /\\n/g
const RE_SINGLE_QUOTES = /^'.*'$/
const RE_DOUBLE_QUOTES = /^".*"$/

export function parse (src = '', { debug = false } = {}) {
  const result = src.toString().split(RE_NEWLINES).reduce((acc, line, index) => {
    if (line.length === 0) {
      return acc
    }

    try {
      let [, key, value = ''] = line.match(RE_KEY_VAL)

      if (RE_SINGLE_QUOTES.test(value)) {
        value = value.slice(1, -1)
      }

      if (RE_DOUBLE_QUOTES.test(value)) {
        value = value.slice(1, -1).replace(RE_NEWLINE, '\n')
      }

      acc[key] = value.trim()

      return acc
    } catch {
      if (debug) {
        console.log(`[dotenv] parse error on line ${index + 1}: ${line}`)
      }

      return acc
    }
  }, {})

  return result
}

export function config ({ path, defaults, encoding = 'utf8', debug = false } = {}) {
  const defaultsPath = defaults || resolve(process.cwd(), '.env.defaults')
  const dotEnvPath = path || resolve(process.cwd(), '.env')

  try {
    let parsed = {}

    if (existsSync(defaultsPath)) {
      parsed = Object.assign({}, parsed, parse(readFileSync(defaultsPath, { encoding }), { debug }))
    }

    if (existsSync(dotEnvPath)) {
      parsed = Object.assign({}, parsed, parse(readFileSync(dotEnvPath, { encoding }), { debug }))
    }

    Object.keys(parsed).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(process.env, key)) {
        if (debug) {
          console.log(`[dotenv] ${key} is already defined in \`process.env\` and will not be overwritten`)
        }

        return
      }

      process.env[key] = parsed[key]
    })

    return { parsed: process.env }
  } catch (error) {
    return { error }
  }
}
