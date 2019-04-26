import 'jest'
import { onLoad } from '../index'
// @ts-ignore
import otherSvc from '@services/other/other'
import { getMockedFunctionRef } from '../../../testLibs/testUtilities'

jest.mock('../../../services/other/other')

describe('home index page', function () {
    test('calls other service once', function () {
        const getTextMock = getMockedFunctionRef(otherSvc.getText)
        onLoad()
        expect(getTextMock.mock.calls.length).toBe(1)
    })
})