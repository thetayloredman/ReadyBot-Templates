import { Event } from '../interfaces';

export const event: Event = {
  name: 'ready',
  run: (client) => {
    console.log('The bot is ready blyat');
  }
}