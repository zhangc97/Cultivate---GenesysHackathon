import {url} from './host'

export const loginWithoutLoginPage = () => {
  let config = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return fetch(url+'/login', config)
    .then(res => res.json()
    .then(user => ({user, res})))
    .then(({user, res}) => {
      return user
    }).catch(error => console.log('Error: ', err))
}
