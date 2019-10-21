import React, { Component } from 'react'

export default class List extends Component
{
    constructor(props)
    {
        super(props)
    }
    render()
    {
        let { channels } = this.props.props;
        console.log("prooppppppppppppppppps", channels)
        return (
            <div>
                {channels.map(item =>
                {
                    return <div>
                        # {item.id}
                   </div>
                    })}
            </div>
        )
    }
}
