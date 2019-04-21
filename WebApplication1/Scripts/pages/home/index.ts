import * as _ from 'lodash'
import omg from '../../services/other/other'

onLoad()

function onLoad() {
    console.log('test')
    let num = 0

    num += 20
    num = 9

    console.log(_.min([1, 3]))

    console.log(num)

    console.log(omg())
}