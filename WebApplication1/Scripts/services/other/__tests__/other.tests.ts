import 'jest'
import otherSvc from '../other'

describe('other stuff', function () {
    test('getText function returns omg', function () {
        const output = otherSvc.getText()
        expect(output).toBe('omg')
    })
})