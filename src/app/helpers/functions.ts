import * as moment from 'moment';
import { Md5 } from 'ts-md5/dist/md5';
export class Functions {
    static protoCheck (protocol: number) {
        if (protocol === 1) {
            return 'udp';
        } else if (protocol === 2) {
            return 'tcp';
        } else if (protocol === 3) {
            return 'wss';
        } else if (protocol === 17) { // UDP
            return 'udp';
        } else if (protocol === 22) { // tls
            return 'tls';
        } else if (protocol === 132) { // tls
            return 'sctp';
        } else if (protocol === 8) { // tcp
            return 'tcp';
        } else if (protocol === 4) {
            return 'sctp';
        } else {
            return 'udp';
        }
    }
    static getColorByString(str: string) {
        const col = Functions.getColorByStringHEX(str);
        const num = parseInt(col, 16) % 360;
        return `hsl(${num}, 100%, 25%)`;
    }
    static getColorByStringHEX(str: string) {
        if (!str) {
            str = '';
        }
        if (str === 'LOG') {
            return 'FFA562';
        }
        let hash = 0;
        let i = 0;

        for (i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        i = hash;
        let col = ((i >> 24) & 0xAF).toString(16) + ((i >> 16) & 0xAF).toString(16) +
                  ((i >> 8) & 0xAF).toString(16) + (i & 0xAF).toString(16);
        if (col.length < 6) {
            col = col.substring(0, 3) + '' + col.substring(0, 3);
        }
        if (col.length > 6) {
            col = col.substring(0, 6);
        }
        return col;
    }
    static messageFormatter(dist: Array<any>) {
        const dataSource: Array<any> = [];
        dist.forEach(item => dataSource.push({
            id: item.id,
            create_date: moment( item.create_date ).format('YYYY-MM-DD'),
            timeSeconds: moment( item.timeSeconds * 1000 ).format('HH:mm:ss.SSS'),
            timeUseconds: (item.timeUseconds / 1000).toFixed(3) + 's',

            method: item.method || 'LOG',
            Msg_Size: (item.raw + '').length,
            srcIp_srcPort: item.srcIp + ':' + item.srcPort,
            srcPort: item.srcPort,

            dstIp_dstPort: item.dstIp + ':' + item.dstPort,
            dstPort: item.dstPort,
            proto: Functions.protoCheck(item.protocol),
            type: item.raw.match(/^[A-Z]*/g).join(''),
            item: item
        }));
        return dataSource;
    }
    static cloneObject(src: any): any {
        try {
            return JSON.parse(JSON.stringify(src));
        } catch ( err ) { }

        return src;
    }
    static getUriParams() {
        return window.location.search ? window.location.search.split('&')
            .map(i => i.replace('?', '').split('=')).reduce((a,b) => (a[b[0]] = b[1], a), {}) : {from: 0, to: 0};
    }
    static md5(str: string): string {
        return Md5.hashStr(str) + '';
    }
    static saveToFile (data, filename, type = 'application/octet-stream') {
        const file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) {// IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        } else { // Others
            const a = document.createElement('a'),
                url = URL.createObjectURL(file);
            a.href = url;
            a.target = '(file)';
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }
}
