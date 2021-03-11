import {Header} from './Header'
jest.mock('./Header')

class HeaderConsumer {
  constructor() {
    this.header = new Header()
  }
}

beforeEach(() => {
  Header.mockClear();
});

describe('class Header', () => {
  test('if the consumer called the class constructor', () => {
    const headerConsumer = new HeaderConsumer()
    expect(Header).toHaveBeenCalledTimes(1);
  })

  test('if the consumer called a method on the class instance', () => {
    expect(Header).not.toHaveBeenCalled()

    const headerConsumer = new HeaderConsumer()
    expect(Header).toHaveBeenCalledTimes(1)
  })
})
