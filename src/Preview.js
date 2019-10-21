import React, { Component } from 'react'

export default class Preview extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            hovering: "hidden"
        }
    }
    mouseEnter = () =>
    {
        this.setState({hovering:"visible"})
    }   
    mouseLeave = () =>
    {
        this.setState({hovering:"hidden"})
    }   
    render()
    {
        let { item } = this.props;
        let { hovering } = this.state;
        return (
            <div  onMouseEnter={this.mouseEnter}
                onMouseLeave={this.mouseLeave}
                style={{ position: "relative", height: 50, height: 50, marginLeft: 5, marginRight: 5 }}>
                <img src={item.url} className="image-preview"
                    />
                <div className="close-preview" style={{ position: "absolute", opacity: 0.5,visibility:hovering,height:"100%",width:"100%",top:0,left:0 ,borderRadius:5}}>
                    
                    <img src={process.env.PUBLIC_URL + '/images/delete.png'}
                        onClick={() => this.props.removeFile(item.id)} style={{borderRadius:5}}/>
                </div>

        </div>
        )
    }
}
