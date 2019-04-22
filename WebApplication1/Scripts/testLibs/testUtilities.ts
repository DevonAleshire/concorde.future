import 'jest'

export function getMockedFunctionRef<T>(ref: T): jest.Mock<T> {
    return ref as unknown as jest.Mock<T>
}