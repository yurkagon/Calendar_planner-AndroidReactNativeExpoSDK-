class User{
    constructor(){
        this._name = null;
        this._mail = null;
        this._avatar = null;
    }
    setUser(response){
        let userInfo = response.user;

        this._name = userInfo.givenName;
        this._mail = userInfo.email;
        this._avatar = userInfo.photoUrl;
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

    //testing
    setTestUser(){
        this._name = "Yuragon";
        this._mail = "somemail@gmail.com";
        this._avatar = "https://lh5.googleusercontent.com/-ahS24LsisJo/AAAAAAAAAAI/AAAAAAAAAM0/1HJ-cKquaIY/photo.jpg";
    }
}

var currentUser = new User();
export default currentUser;