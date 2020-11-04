class Config {
   hosts = {
        production: 'www.qcomply.com/V2',
        development: 'development',
        local: 'localhost',
    }
    environment = {
        production: false,
        development: false,
        local: false
    }
    baseUrl = null;

    constructor() {
        this.setEnvironment();
        this.setBaseUrl();
    }

    setEnvironment() {
        for (let host in this.hosts) {
            if (window.location.href.includes(this.hosts[host])) {
                this.environment[host] = true;
                break;
            }
        }
    }

    setBaseUrl() {
        this.baseUrl = window.location.origin;
    }
}

let MasterConfig = new Config();