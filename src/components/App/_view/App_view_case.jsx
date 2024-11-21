import React from 'reactify'
import { withBemMod } from '@bem-react/core'

import { Spacer } from '@yandex/ui/Spacer/desktop/index'
import { Button } from '@yandex/ui/Button/desktop/bundle'
import { MessageBox } from '@yandex/ui/MessageBox/desktop/bundle'
import { Text } from '@yandex/ui/Text/desktop/bundle'

import './App_view_case.css'

import { blockName } from 'App/App'
import Header from 'Header/Header'
import Case from 'Case/Case'
import { useCase } from '../../Case/hooks'
import { useLogin } from '../../Login/hooks'
import { Textinput } from '@yandex/ui/Textinput/desktop/bundle'

const AppView = () => ({ className, timerDate }) => {

    const [countBugs, setCountBugs] = React.useState([])
    const [showMessageBox, setShowMessageBox] = React.useState(false)

    const handleIncreaseCountBugs = (bug) => {
        if (!countBugs.includes(bug)) setCountBugs([...countBugs, bug])
    }

    const { values, handleChangeValues, calculate, reset } = useCase(handleIncreaseCountBugs)

    const { closeSession, error, password, handleChangePassword } = useLogin()

    const handleToLogout = () => window.location.href = '/logout'

    const handleToShowMessageBox = () => setShowMessageBox(!showMessageBox)

    return (<div className={`${blockName} ${className}`}>
        <Header timerDate={timerDate} countBugs={countBugs} />

        <div className={React.cn('App', 'content')()}>
            <Spacer>
                <img src='public/main.jpg' />
            </Spacer>
            <Spacer>
                <Case handleIncreaseCountBugs={handleIncreaseCountBugs} values={values} handleChangeValues={handleChangeValues} calculate={calculate} reset={reset} />
            </Spacer>
        </div>
        <div className={React.cn('App', 'controls')()}>
            <Button
                onClick={handleToShowMessageBox}
                size="m"
                theme="normal"
                view="default"
                className="App-link">
                Сбросить и закрыть
            </Button>
        </div>
        <MessageBox
            className={showMessageBox ? 'active' : ''}
            layout="functional"
            view="inverse"
            size="m"
            actions={
                <div>
                    <Button onClick={() => setShowMessageBox(false)} view="clear" size="s">
                        Отменить
                    </Button>
                    <Button onClick={closeSession} view="action" size="s">
                        Применить
                    </Button>
                </div>
            }
        >
            <Text as='h3'>Для того, чтобы закрыть интервью необходимо ввести пароль</Text>
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
        </MessageBox>
    </div>)
}

export const AppViewCase = withBemMod('App', { view: 'case' }, AppView)
