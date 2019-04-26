// @ts-ignore
import otherSvc from '@services/other/other'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import AjaxButton from '../../components/ajaxButton/ajaxButton'
import 'es-promise'

const fakeAjaxCall = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 5000)
    })
}

const mountReactComponents = () => {
    ReactDOM.render(<AjaxButton text='real test' onClick={fakeAjaxCall} />, document.getElementById('ajaxButton'))
}

export function onLoad() {
    console.log('test')
    let num = 0

    num += 20
    num = 9

    console.log(num)

    console.log(otherSvc.getText())

    mountReactComponents()
}