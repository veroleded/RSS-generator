import './styles.scss';
import validatorForForm from './validator.js';
import init from './init.js';

const state = init();

validatorForForm(state);
