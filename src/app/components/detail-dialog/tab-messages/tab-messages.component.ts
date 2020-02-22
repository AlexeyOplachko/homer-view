import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Functions } from '../../../helpers/functions';

export interface MesagesData {
    id: string;
    create_date: string;
    timeSeconds: string;
    timeUseconds: string;
    method: string;
    Msg_Size: string;
    srcIp_srcPort: string;
    srcPort: string;
    dstIp_dstPort: string;
    dstPort: string;
    proto: string;
    type: string;
    item: any;
}

@Component({
    selector: 'app-tab-messages',
    templateUrl: './tab-messages.component.html',
    styleUrls: ['./tab-messages.component.css']
})

export class TabMessagesComponent implements OnInit {
    @Input() dataItem: any;
    @Output() messageWindow: EventEmitter<any> = new EventEmitter();

    isWindow = false;

    dataSource: Array<MesagesData> = [];
    displayedColumns: string[] = [
        'id', 'create_date', 'timeSeconds', 'timeUseconds',
        'method', 'Msg_Size', 'srcIp_srcPort', 'dstIp_dstPort',
        'dstIp_dstPort', 'dstPort', 'proto', 'type',
    ];

    constructor() { }

    ngOnInit() {
        this.dataSource = Functions.messageFormatter(this.dataItem.data.messages);
    }
    onClickMessageRow(row: any, event = null) {
        row.mouseEventData = event;
        this.messageWindow.emit(row);
    }

}
