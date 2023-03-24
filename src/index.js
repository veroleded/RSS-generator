import './styles.scss';
import app from './app.js';
import initState from './init.js';
import timingUpdate from './postupdate.js';

const state = initState();

app(state);
timingUpdate(state);
