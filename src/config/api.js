import axios from 'axios';
import { CUSTOMER_DOMAIN } from './domain';

export default axios.create({
  baseUrl: CUSTOMER_DOMAIN,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    // auth: sessionStorage.get('auth')
  }
})