﻿//******************************************************************************************************
//  TimeCorrelatedSags.tsx - Gbtc
//
//  Copyright © 2018, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the MIT License (MIT), the "License"; you may not use this
//  file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://opensource.org/licenses/MIT
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  02/05/2019 - Stephen C. Wills
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from "lodash";
import './../jquery-ui.js';
import OpenSEEService from './../TS/Services/OpenSEE';

export default class HarmonicStats extends React.Component<any, any>{
    props: { eventId: number, callback: Function }
    state: { rows: Array<Object>, header: Array<Object>, exportData: any}
    openSEEService: OpenSEEService;

    constructor(props) {
        super(props);
        this.openSEEService = new OpenSEEService();
        this.state = {
            rows: [],
            header: [],
            exportData: null
        };
    }

    componentDidMount() {
        ($("#correlatedsags") as any).draggable({ scroll: false, handle: '#correlatedsagshandle' });

        this.openSEEService.getTimeCorrelatedSags(this.props.eventId).done(data => {
            if (data.length === 0)
                return;

            var header = HeaderRow();
            var rows = [];

            for (var index = 0; index < data.length; ++index) {
                var row = data[index];
                var background = 'default';

                if (row.EventID == this.props.eventId)
                    background = 'lightyellow';

                rows.push(Row(row, background));
            }

            this.setState({header: header, rows: rows});
        });
    }

    render() {
        return (
            <div id="correlatedsags" className="ui-widget-content" style={{ position: 'absolute', top: '0', display: 'none'}}>
                <div id="correlatedsagshandle"></div>
                <div id="correlatedsagscontent">
                    <table className="table" style={{fontSize: 'large', marginBottom: 0}}>
                        <thead style={{ display: 'table', tableLayout: 'fixed'}}>
                            {this.state.header}
                        </thead>
                        <tbody style={{ fontSize: 'medium', maxHeight: 500, overflowY: 'auto', display: 'block'}}>
                            {this.state.rows}
                        </tbody>
                    </table>
                </div>
                <button className="CloseButton" onClick={() => {
                    this.props.callback({ correlatedSagsButtonText: "Show Correlated Sags" });
                    $('#correlatedsags').hide();
                }}>X</button>
            </div>
        );
    }
}

const Row = (row, background) => {

    return (
        <tr style={{ display: 'table', tableLayout: 'fixed', background: background }} key={row.EventID}>
            <td style={{ width: 80 }} key={'EventID' + row.EventID}><a href={'./OpenSEE?eventid=' + row.EventID}><div style={{ width: '100%', height: '100%' }}>{row.EventID}</div></a></td>
            <td style={{ width: 110 }} key={'EventType' + row.EventID}>{row.EventType}</td>
            <td style={{ width: 220 }} key={'StartTime' + row.EventID}>{row.StartTime}</td>
            <td style={{ width: 150 }} key={'MeterName' + row.EventID}>{row.MeterName}</td>
            <td style={{ width: 400 }} key={'LineName' + row.EventID}>{row.LineName}</td>
        </tr>
    );
}

const HeaderRow = () => {
    return (
        <tr key='Header'>
            <th style={{ width: 80 }} key='EventID'>Event ID</th>
            <th style={{ width: 110 }} key='EventType'>Event Type</th>
            <th style={{ width: 220 }} key='StartTime'>Start Time</th>
            <th style={{ width: 150 }} key='MeterName'>Meter Name</th>
            <th style={{ width: 'calc(400px - 1em)' }} key='LineName'>Line Name</th>
        </tr>
    );
}



