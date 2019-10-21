import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default class CustomChannelHeader extends React.PureComponent
{
    render()
    {
        return (
            <div className="channel-header">
                <div>
                    # {this.props.channel.cid}
                </div>
                <div className="row icon-wrapper">
                    <div style={{ height: 30, width: 30 }}>
                        {/* <img src="/public/images/addIcon.png"/> */}
                        </div>
                    {this.props.watcher_count} | general fr
                    </div>
            </div>
        );
    }
}