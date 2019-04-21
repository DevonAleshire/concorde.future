import omg from '../other'

describe('other stuff', function () {
    test('default function returns omg', function () {
        const output = omg()
        expect(output).toBe('omg')
    })
})