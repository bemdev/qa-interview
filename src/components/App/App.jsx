import React from 'reactify';
import { compose } from '@bem-react/core';

import { Spacer } from '@yandex/ui/Spacer/desktop';
import { Text } from '@yandex/ui/Text/desktop/bundle';

import { AppViewCase } from './_view/App_view_case';
// import { AppViewDocs } from './_view/App_view_docs';
// import Header from 'Header/Header'

import './App.css'
import Login from 'Login/Login';

export const blockName = React.cn('App')();

const App = ({ className }) => {
    return (
        <div className={`${blockName} ${className}`}>
            {/* <Header /> */}
            <div className={React.cn('App', 'content')()}>
                <Spacer top={40} bottom={20} style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="App_logo-1" />
                    <div className="App_logo-2" />
                    <div className="App_logo-3" />
                </Spacer>
                <Text color="inverse" as="div">
                    <Text color="inverse" as="h1">
                        QA интервью сервис
                    </Text>
                </Text>
                <div className={React.cn('App', 'controls')()}>
                    <Login />
                </div>
            </div>
        </div>
    );
};

const withCompose = compose(AppViewCase)(App);
// const withCompose = compose()(App);

export default withCompose;