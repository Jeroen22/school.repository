class Events{
    //fields
    static topics : any = {};
    
    //cosntructor
    constructor(){} 
    static on(eventName : string, fn : Function) {
        Events.topics[eventName] = Events.topics[eventName] || [];
        Events.topics[eventName].push(fn);
    }

    //methods
    static off(eventName : string, fn : Function) {
        if (this.topics[eventName]) {
            for (var i = 0; i < this.topics[eventName].length; i++) {
                if (this.topics[eventName][i] === fn) {
                    this.topics[eventName].splice(i, 1);
                    break;
                }
            };
        }
    }

    static trigger(eventName : string, data : {}) {
        if (Events.topics[eventName]) {
            Events.topics[eventName].forEach(function(fn : Function) {
                fn(data);
            });
        }
    }

}