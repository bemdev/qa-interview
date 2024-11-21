import React from 'reactify'

import { Textinput } from '@yandex/ui/Textinput/desktop/bundle'
import { Spacer } from '@yandex/ui/Spacer/desktop/index'
import { Button } from '@yandex/ui/Button/desktop/bundle'

import './Case.css'
export const blockName = React.cn('Case')()

const Case = ({ values, handleChangeValues, calculate, reset, handleIncreaseCountBugs }) => <div className={blockName}>
    <form onSubmit={(e) => calculate(e, handleIncreaseCountBugs)}>
        <Textinput
            autoFocus
            size='m'
            view='default'
            placeholder='Значение A'
            name='a'
            type='text'
            pattern="[0-9]{1,25}|[a-zA-Z]\s\*.*"
            value={values.a}
            // state={error}
            hasClear
            onChange={handleChangeValues}
        />
        <Textinput
            size='m'
            view='default'
            placeholder='Значение B'
            name='b'
            type='text'
            pattern='-?[0-9]{1,25}'
            value={values.b}
            // state={error}
            disabled={!Number(values.a)}
            required
            hasClear
            onChange={handleChangeValues}
        />
        <Textinput
            size='m'
            view='default'
            type='text'
            readOnly
            disabled
            value={values.c}
            hasClear
        />
        <Button
            disabled={!values.a || !Number(values.a) && values.a.toLowerCase() != 'Select * from result'.toLowerCase()}
            type='submit'
            width='max'
            size="m"
            theme="raised"
            view="action"
            className="App-link">
            Применить
        </Button>
    </form>
</div>

export default Case