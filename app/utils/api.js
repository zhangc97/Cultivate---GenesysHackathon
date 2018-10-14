import {url} from './host'
import axios from 'axios'

const storage = {
  // This is the environment url
  apiUrl: "https://gapi-use1.genesyscloud.com",
  // This is the environment client id
  clientId: "b219ac0408a14a33ac4333382fc776c3",
  // This is the environment client secret
  clientSecret: "es33SiFOzMaaZ6KQ57jQ7L167owt2KOeaJq0BXEEdtlcY6V5",
  // This is your service port
  port: 3002,
  // This is needed as a header to authorize requests
  apiKey: "iB4b9IG8536FQCKiPlyXL9wJYfKbALKT4GZW9VGu"
};

export const loginWithoutLoginPage = () => {
  let config = {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    }
  }
  return axios.get(url+'/login')
    .then(function(res){
      return res.data
    })

}

export const getUsers = () => {
  return axios.get(url + '/provisioning/get-users')
    .then(function (response){
      console.log(response)
      return response
    }). catch(function (error){
      console.log(error)
      return error
    })
}

export const getStats = (objectId, objectType, statName) => {
  return axios.get(url + '/statistics/getValue',{
    params: {
      objectId: objectId,
      objectType: objectType,
      statName: statName
    }
  })
  .then(function(response){
    return response;
  })
  .then(function (error){
    return error;
  })
}
