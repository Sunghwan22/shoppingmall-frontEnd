import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from '../config';

const baseurl = config.apiBaseUrl;

const server = setuptestServer();
