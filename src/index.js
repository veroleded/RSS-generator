import './styles.scss';
import app from './app.js';
import init from './init.js';
// import parse from './parser.js';

const state = init();

app(state);

// parse('https://ru.hexlet.io/lessons.rss');
