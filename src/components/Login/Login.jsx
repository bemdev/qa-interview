import React from 'reactify'

import { Button } from '@yandex/ui/Button/desktop/bundle';
import { Textinput } from '@yandex/ui/Textinput/desktop/bundle'
import { Spacer } from '@yandex/ui/Spacer/desktop/index'

import './Login.css'

import { useLogin } from './hooks';

export const blockName = React.cn('Login')()

const Login = () => {

    const { login, error, password, handleChangePassword } = useLogin()

    return (
        <div className={blockName}>
            <Textinput
                autoFocus
                size='m'
                view='default'
                placeholder='Введите пароль'
                type='password'
                value={password}
                state={error}
                hasClear
                onChange={handleChangePassword}
            />
            <Spacer vertical={14} />
            <Button
                disabled={!password || password.length == 0}
                onClick={login}
                size="l"
                width='max'
                theme="raised"
                view="action"
                className="App-link">
                Начать
            </Button>
        </div>
    )
}

export default Login