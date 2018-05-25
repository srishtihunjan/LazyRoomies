let url;
switch(process.env.NODE_ENV){
    case 'production':
        url = "https://first-trial-gsc.herokuapp.com/";
        break;
    default:
        url = "http://localhost:8000/";
}
module.exports = {url: url};