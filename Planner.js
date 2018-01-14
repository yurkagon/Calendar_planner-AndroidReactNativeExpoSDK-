class User{
    constructor(){
        this._name = null;
        this._mail = null;
        this._avatar = null;
        this._accessToken = null;

        this._autoUpdateTime = 15000;

        this._arrayOfEvents = [];

        this._updator = null;

    }
    reset(){
        this._name = null;
        this._mail = null;
        this._avatar = null;
        this._accessToken = null;
        this._arrayOfEvents = [];
    }
    setUpdator(method){
        this._updator = method;
    }
    async Update(){
        this._updator();
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
        this._arrayOfEvents = arr.sort(this.sortDatesReverse);
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

    sortDatesToDisplay(arr){
        let nowDate = new Date();

        let past = arr.filter(it=>{
            if(new Date(it.start.dateTime).toString() == "Invalid Date" ) return false;
            return nowDate > (new Date(it.end.dateTime));
        }).sort(this.sortDates);
        let future = arr.filter(it=>{
            if(new Date(it.start.dateTime).toString() == "Invalid Date" ) return false;
            return nowDate < (new Date(it.start.dateTime));
        }).sort(this.sortDatesReverse);
        let now = arr.filter(it=>{
            if(new Date(it.start.dateTime).toString() == "Invalid Date" ) return false;
            return nowDate >= (new Date(it.start.dateTime)) && nowDate <= (new Date(it.end.dateTime));
        }).sort(this.sortDatesReverse);
        let noDate = arr.filter(it=>{
            if(new Date(it.start.dateTime).toString() == "Invalid Date" ) return true;
        });

        return now.concat(future,past,noDate);
    }
    sortDatesReverse(d1,d2){
        let a = new Date(d1.end.dateTime);
        let b = new Date(d2.end.dateTime);
        if(a.toString() == "Invalid Date" ) return 1;
        if(b.toString() == "Invalid Date" ) return -1;
        return a-b;
    }
    sortDates(d1,d2){
        let a = new Date(d1.end.dateTime);
        let b = new Date(d2.end.dateTime);
        if(a.toString() == "Invalid Date" ) return 1;
        if(b.toString() == "Invalid Date" ) return -1;
        return b-a;
    }

    //d2 > d1 !!!!
    formatTimeBetweenDates(d1,d2){
        const MILLS_IN_DAY = 8.64e+7;
        ms = d2.getTime() - d1.getTime();
        if(ms < 0) return " error ";

        let time = new Date(ms);
        let days = Math.floor(ms/MILLS_IN_DAY);
        let hours = time.getUTCHours();
        let minutes = time.getUTCMinutes();
        let seconds = time.getUTCSeconds();
        
        return (days||hours||minutes)?(
                    (days ? days+(days>1?" days ":" day ") : "") +
                    (hours ? hours+(hours>1?" hours ":" hour ") : "") + 
                    (minutes ? minutes+(minutes>1?" minutes ":" minute ") : "")
                ):(seconds ? seconds+(seconds>1?" seconds ":" second ") : " no time ");
    }
}

var currentUser = new User();
export default currentUser;