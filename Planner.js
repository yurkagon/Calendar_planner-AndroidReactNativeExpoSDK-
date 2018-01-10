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

    //methods
    formatDateToDisplay(str){
        try{
            if(!str){
                return "No information";
            }
            else{
                let date = str.split('T')[0].replace(/-/g, '/');
                let time = str.split('T')[1].slice(0,5);
                let result = date + ' in ' + time;
    
                return result;
            }
        }
        catch(e){
            return "No information";
        }
    }
    formatTextToDisplayByLimit(str,limit){
        let max = limit ? limit : 21;
        
        if(!str){
            return "No information";
        }
        else{
            if(str.length > max) return str.substring(0,max-3) + "...";
            else return str;
        }
    }
}

var currentUser = new User();
export default currentUser;