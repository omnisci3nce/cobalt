const add = (x: number, y: number) => x + y

describe('add', () => {
  test('5 + 10 = 15', () => {
    expect(add(5, 10)).toEqual(15)
  })
})