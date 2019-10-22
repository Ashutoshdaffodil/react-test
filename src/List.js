import React, { Component,Fragment } from 'react'

export default class List extends Component
{
    constructor(props)
    {
        super(props)
    }
  
    render()
    {
        let { channels, activeChannel = { id: "" } } = this.props.props;
        let { members, channel } = this.props;
        let { id } = channel.data;
        let arrayOfMembers = Object.entries(members).map((e) => (e[1]));
        return (
            <Fragment>
            <div className="channel-list-wrapper">
                <p className="channels">
                Channels
                    </p>
                {channels.map(item =>
                {
                    console.log("iten",item)
                    return <div className="row channel-item ml-2" style={{
                        color:id === item.id ? "white" : null,
                        backgroundColor: id === item.id ? "#34388B" : ""
                    }}
                        onClick={() =>
                        {
                            
                            this.props.setChannel(item)
                            
                        }}
                    >
                        <img className='mr-3' src={"data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' height='15' viewBox='0 -21 469.333 469' width='15'><path d='M448 106.84h-64.813l21.399-79.809c3.05-11.37-3.691-23.082-15.082-26.133-11.39-3.05-23.106 3.711-26.133 15.082l-24.34 90.86H187.52l21.398-79.809c3.05-11.37-3.691-23.082-15.082-26.133-11.395-3.027-23.082 3.711-26.113 15.082l-24.364 90.86H64c-11.777 0-21.332 9.535-21.332 21.332 0 11.8 9.555 21.336 21.332 21.336h67.902l-34.324 128H21.332C9.559 277.508 0 287.043 0 298.84s9.559 21.332 21.332 21.332h64.813L64.746 399.98c-3.05 11.372 3.692 23.082 15.082 26.133 1.836.492 3.692.727 5.504.727 9.41 0 18.05-6.274 20.59-15.809l24.383-90.86h151.507l-21.398 79.81c-3.047 11.37 3.691 23.081 15.086 26.132 1.832.492 3.688.727 5.523.727 9.41 0 18.047-6.274 20.586-15.809l24.364-90.86h79.359c11.777 0 21.336-9.534 21.336-21.331s-9.559-21.332-21.336-21.332H337.43l34.324-128H448c11.777 0 21.332-9.535 21.332-21.336 0-11.797-9.555-21.332-21.332-21.332zM293.246 277.508H141.738l34.324-128h151.512zm0 0' data-original='%23000000' class='active-path' data-old_color='%23000000' fill='%23616061'/></svg>"}/>
                     {item.id}
                   </div>
                    })}
                </div>
                <div style={{ height: 300, width: "100%", paddingTop: 20 ,backgroundColor:"white"}}>
                    <p className="number-of-members">
                        {arrayOfMembers.length}    members
                    </p>
                    {arrayOfMembers.map(item =>
                    {
                        return <div className="row members-wrapper">
                            <div>
                                <img className="members-image" src={item.user.image} />
                            </div>
                            <div className="members-name">
                                {item.user.id}
                                </div>
                            <div className="online" style={{backgroundColor:item.user.online?"green":"red"}}/>
                        </div>
                    }) 
                
                    }
                </div>
                </Fragment>
        )
    }
}
