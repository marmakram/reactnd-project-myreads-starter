import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { NotFound } from './components/main';

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" exact component={App} />
                <Route path='*' component={NotFound} />
        </Switch>
    </Router>
    , document.getElementById('root'))
