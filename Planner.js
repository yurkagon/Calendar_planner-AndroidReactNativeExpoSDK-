class User{
    constructor(){
        this._name = null;
        this._mail = null;
        this._avatar = null;
        this._accessToken = null;

        this._autoUpdateTime = 15000;

        this._arrayOfEvents = [];
    }
    setUser(response){
        let userInfo = response.user;
        this._name = userInfo.givenName;
        this._mail = userInfo.email;
        this._avatar = userInfo.photoUrl;

        this._accessToken = response.accessToken;
    }

    //getters
    get name(){
        return this._name;
    }
    get mail(){
        return this._mail;
    }
    get avatar(){
        return this._avatar;
    }
    get accessToken(){
        return this._accessToken;
    }
    get autoUpdateTime(){
        return this._autoUpdateTime;
    }
    get arrayOfEvents(){
        return this._arrayOfEvents;
    }

    //setters
    set arrayOfEvents(arr){
        this._arrayOfEvents = arr;
    }
}

var currentUser = new User();
export default currentUser;