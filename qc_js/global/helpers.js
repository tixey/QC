class Helper {
    static API_PREFIX = 'php/json_data.php?'
    static procedures  = {
        lock: 'JS04'
    }


    static getLocalDevelopmentUrl = () =>  `${window.location.protocol}//${MasterConfig.hosts.development}${window.location.pathname}${window.location.search}`

    static getCurrentPage = () => window.location.pathname.substring(window.location.pathname.lastIndexOf("/")+1)

    static makeUrl(named, ending = []) {
        let page = Helper.getCurrentPage();
        let namedParams = '';
        let namedKeys = Object.keys(Object.assign(named));

        namedKeys.forEach((item, index) => {
            let key = item;

            if(index > 0) {
                key = `&${key}`;
            }

            namedParams += `${key}=${named[item]}`;
        })

        return `${Helper.API_PREFIX}URL=${page}&${namedParams}&PAR=${ending.join(',')}`;
    }

    static async postJson(procedure, formParams = {}) {
        return new Promise((resolve, reject) => $.ajax({
            url: Helper.makeUrl({'SP': procedure}, 'POST'),
            data: formParams,
            type: 'post',
            success: resolve,
            error: reject
        }));
    }

    static async getJson(procedure, endParams = []) {
        return new Promise((resolve, reject) => $.ajax({
            url: Helper.makeUrl({'SP': procedure}, endParams),
            type: 'get',
            success: resolve,
            error: reject
        }));
    }
}
