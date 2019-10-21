import React, { Component } from 'react'
import { Chat} from "stream-chat-react"

 export default class DemoChatComponent extends Component {
    render() {
        return (
            <ol>
            <li>UserID: {this.props.client.userID}</li>
            <li>Active Channel: {this.props.channel.cid}</li>
          </ol>
        )
    }
}

