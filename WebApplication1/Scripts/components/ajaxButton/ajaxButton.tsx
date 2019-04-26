import * as React from 'react';

enum AjaxState {
    Idle,
    Working
}

export interface IProps {
    onClick: () => Promise<any>,
    text: string,
    buttonProps?: {
        type?: 'button' | 'submit' | 'reset',
        value?: string,
        name?: string
    }
}

const AjaxButton: React.FC<IProps> = function AjaxButton(props: IProps) {
    const [ajaxState, setAjaxState] = React.useState(AjaxState.Idle)
    let result: JSX.Element

    const onClick = async (e: any) => {
        setAjaxState(AjaxState.Working)
        await props.onClick()
        setAjaxState(AjaxState.Idle)
    }

    switch (ajaxState) {
        case AjaxState.Working:
            result = <span>Working...</span>
            break;
        case AjaxState.Idle:
        default:
            result = <button {...props.buttonProps} onClick={onClick}>{props.text}</button>
    }

    return result
}

export default AjaxButton