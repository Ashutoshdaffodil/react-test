import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default class CustomChannelHeader extends React.PureComponent
{
    render()
    {
        let { members, channel } = this.props;

        let arrayOfMembers = Object.entries(members).map((e) => (e[1]));
        return (
            <div className="channel-header">
                <div className="channel-heading">
                    # {channel.data.id}
                </div>
                <div className="row icon-wrapper">
                    <div style={{ height: 30, width: 30 }}>
                        <img src={process.env.PUBLIC_URL+"/images/user.png"}/>
                        </div>
                    {arrayOfMembers.length} | {channel.data.name}
                    </div>
            </div>
        );
    }
}