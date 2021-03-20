import axios from 'axios';


function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


const client = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 100000
});

client.defaults.headers.common['Content-Type'] = `Application/json`;


client.interceptors.request.use(
    function(config) {
      config.headers['Authorization'] = `Bearer ${getCookie('_TuVbwpW').replace('%7C', '|')}`
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

export default client;
