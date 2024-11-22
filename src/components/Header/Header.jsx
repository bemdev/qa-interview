import React from 'reactify'

import { Text } from '@yandex/ui/Text/desktop/bundle';
import { Link } from '@yandex/ui/Link/desktop/bundle';
import { Spacer } from '@yandex/ui/Spacer/desktop/index'
import { Popup } from '@yandex/ui/Popup/desktop/bundle'

import './Header.css'

export const blockName = React.cn('Header')();

const menuList = [
    { url: '/', title: 'About us' },
    { url: '/docs', title: 'Documentation' },
    { url: '/', title: 'Storybook' },
    { url: '/', title: 'Porfolio' },
    { url: '/', title: 'Tools' },
    { url: '/', title: 'Contacts' },
]

const Header = ({ timerDate, countBugs }) => {

    const [visiblePopup, setVisiblePopup] = React.useState(false)

    const refScope = React.useRef(null)
    const refPopup = React.useRef(null)

    const calculateExpires = () => {
        let now = Date.now()
        let expiresDate = new Date(timerDate).getTime()
        let expires = (now - expiresDate) / 60000
        return 60 - expires.toFixed()
    }

    const [timeover, setTimeOver] = React.useState(calculateExpires())

    React.useEffect(() => {
        let interval = setInterval(() => {
            const exp = calculateExpires()
            if (exp <= 0) window.location.href = '/logout'
            setTimeOver(exp)
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    })

    return (
        <div className={`${blockName}`} ref={refScope}>
            <Text color="inverse" typography='headline-l' weight='bold'>QA интервью</Text>
            <div style={{ display: 'flex' }}>
                <Text color="inverse" typography='body-s' weight='bold'>Сессия закроется через: {timeover} мин.</Text>
                <Spacer horizontal={22} />
                <div ref={refPopup}>
                    <Text onMouseLeave={() => setVisiblePopup(false)} onMouseEnter={() => setVisiblePopup(true)} color="inverse" typography='body-s' weight='bold'>Найдено багов: {countBugs.length} из 8</Text>
                    {countBugs.length > 0 && <Popup
                        style={{}}
                        target='anchor'
                        anchor={refPopup}
                        scope={refScope}
                        directions='right-bottom'
                        visible={visiblePopup} view="default"
                    >
                        {countBugs.map(bug => <Spacer bottom={4}><Text>{bug}</Text></Spacer>)}
                    </Popup>}
                </div>
                <Spacer horizontal={22} />
            </div>

        </div>
    );
};

export default Header;