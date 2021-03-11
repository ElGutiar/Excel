import { ActiveRoute } from './ActiveRoute'
let path

beforeEach(() => {
  ActiveRoute.navigate('http://localhost:3000/#excel')
  path = 'http://localhost:3000/#excel'
})

describe('ActiveRoute methods', () => {
  test('methods should be defined', () => {
    expect(ActiveRoute.navigate).toBeDefined()
    expect(ActiveRoute.path).not.toBeUndefined()
    expect(ActiveRoute.param).not.toBeUndefined()
  })
},

describe('ActiveRoute path', () => {
  test('getter path should return value', () => {
    expect(ActiveRoute.path).toBe(path)
  })

  test('getter path should not to return old path after change', () => {
    ActiveRoute.navigate('http://localhost:3000/#dashboard')
    expect(ActiveRoute.path).not.toBe(path)
  })
}),
)
