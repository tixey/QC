class QCData {
    // TTODO:: write function for highlighting responses etc after stored procedure calls
    GLOBAL_STORES = {
        Companies: null,
        EntityNames: null,
        StatusesStore: null,
        StagesStore: null
    }

    constructor() {

        this.GLOBAL_STORES.Companies = {
           store: this.createStore({
                Key: 'ID',
                cacheRawData: true,
                loadMode: "raw",
                load:() => Helper.getJson('008',[0,'']),
                byKey:(key) => Helper.getJson('008',[key,''])
            })
        }
        this.GLOBAL_STORES.Entities = {
           store: this.createStore({
                Key: 'ID',
                cacheRawData: true,
                loadMode: "raw",
                load:() => Helper.getJson('007',[0]),
                byKey:(key) => Helper.getJson('007',[key])
            })
        }
        this.GLOBAL_STORES.Users = {
           store: this.createStore({
                Key: 'ID',
                cacheRawData: true,
                loadMode: "raw",
                load:() => Helper.getJson('003',[0]),
                byKey:(key) => Helper.getJson('003',[key])
            })
        }
        this.GLOBAL_STORES.Statuses = {
           store: this.createStore({
                Key: 'ID',
                cacheRawData: true,
                loadMode: "raw",
                load:() => Helper.getJson('010',[0]),
                byKey:(key) => Helper.getJson('010',[key])
            })
        }
        this.GLOBAL_STORES.Stages = {
           store: this.createStore({
                Key: 'ID',
                cacheRawData: true,
                loadMode: "raw",
                load:() => Helper.getJson('011',[0]),
                byKey:(key) => Helper.getJson('011',[key])
            })
        }

    }

    createStore = (settings)  => new DevExpress.data.CustomStore({...settings})
}

let GlobalQCData = new QCData()
