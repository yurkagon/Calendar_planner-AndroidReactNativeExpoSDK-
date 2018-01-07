class User{
    constructor(){
        this._name = null;
        this._mail = null;
        this._avatar = null;
    }
    setUser(response){
        let userInfo = response.user;
        this._name = userInfo.givenName;
    }

    //getters
    get name(){
        return this._name;
    }
    get mail(){
        return this._name;
    }
    get avatar(){
        return this._avatar;
    }
}

var currentUser = new User();
export default currentUser;