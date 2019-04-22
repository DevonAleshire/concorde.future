
export function test() {
    return 'omg'
}

const otherSvc : IOther = {
    getText: test
}

export default otherSvc

export interface IOther {
    getText(): string
}