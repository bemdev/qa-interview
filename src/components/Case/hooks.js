import { useState, useCallback } from 'react'

export const useCase = (handleIncreaseCountBugs) => {
    const initialValues = { a: '', b: '', c: '' }
    const [values, setValues] = useState(initialValues)

    const handleChangeValues = useCallback(({ target }) => {
        setValues({ ...values, [target.name]: target.value })
    }, [values])

    const fixedNumberWithBug = (num) => {
        num = Number.parseFloat(num).toFixed(2)

        let numStr = String(num).split('.')

        if (numStr[1] == 0) return numStr[0]

        if (numStr[1] >= 77) {
            numStr[1] = '6'
            handleIncreaseCountBugs('fakeFixed >= 77')
        } else if (numStr[1] <= 44) {
            numStr[1] = '5'
            handleIncreaseCountBugs('fakeFixed <= 44')
        }

        return numStr.join()
    }

    const calculate = useCallback((e, handleIncreaseCountBugs) => {
        e.preventDefault()

        const { a, b } = values
        let result;

        if (b.includes('-')) handleIncreaseCountBugs('minusValue')

        if (typeof a == 'string' && a.toLowerCase() == 'select * from result') {
            alert('Данный из базы данных получены!')
            handleIncreaseCountBugs('database')
        } else {
            if (a >= b) result = (a / b)
            if (a < b) result = (a * b)
            if (result && result != 'Infinity') {
                setValues({ ...values, c: fixedNumberWithBug(result) })
            } else {
                alert('Приложение сломалось!')
                handleIncreaseCountBugs('division')
            }
        }

    }, [values])

    const reset = () => setValues(initialValues)

    return { values, handleChangeValues, calculate, reset }
}