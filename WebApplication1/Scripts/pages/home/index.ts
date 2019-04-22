import otherSvc from '../../services/other/other'

export function onLoad() {
    console.log('test')
    let num = 0

    num += 20
    num = 9


    console.log(num)

    console.log(otherSvc.getText())
}