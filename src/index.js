import './styles.scss';
import app from './app.js';
import init from './init.js';
import timingUpdate from './postupdate.js';

const state = init();

app(state);
timingUpdate(state);

// parse('https://lorem-rss.hexlet.app/feed?unit=second');
