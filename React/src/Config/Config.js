let url;
switch(process.env.NODE_ENV){
    case 'production':
        url = "https://first-trial-gsc.herokuapp.com:80/";
        break;
    default:
        url = "http://localhost:8000/";
}
module.exports = {url: url};