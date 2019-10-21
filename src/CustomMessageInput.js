import React, { Component ,Fragment} from 'react'
import { MessageList, MessageInput } from 'stream-chat-react';
import OutsideClickHandler from 'react-outside-click-handler';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import Preview from "./Preview"
export class CustomMessagingInput extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            showEmojiPicker: false,
            text: ""
        }
        this.uploadRef = React.createRef()
    }
    togglePicker=()=>
    {
        this.setState({
            showEmojiPicker:!this.state.showEmojiPicker
        })
    }
    onClickUpload = () =>
    {
        this.uploadRef.current.click();
    }
    uploadFile=async(e)=>
    {
        try
        {
            let { channel, client} = this.props.props;
            e.stopPropagation();
            e.preventDefault();
            const arrayOfObj = Object.entries(e.target.files).map((e) => (e[1]));
            this.props.props.uploadNewFiles(arrayOfObj)
        }
        catch(error)
        {
            console.log("error",error)
        }
    }
    onSelectEmoji = (item) =>
    {
        this.setState({ text: this.state.text + item.native })
    }
    handleChange=(e)=>
    {
        this.setState({text:e.target.value})
    }
    sendMessage = async() =>
    {
        let { channel, client } = this.props.props;
        let {text } = this.state;
        const arrayOfImages = Object.entries(this.props.props.imageUploads).map((e) => (e[1]));
        let attachments = [];
        for (let i = 0; i < arrayOfImages.length; i++)
        {
            attachments.push({type:"image",image_url:arrayOfImages[i].url,asset_url:arrayOfImages[i].url})
        }
        if (text)
        {
            const response = await channel.sendMessage({ text:text,attachments: attachments })
            
        }
        else if(attachments.length)
        {
            const response = await channel.sendMessage({ attachments: attachments })
            if (response)
            {
                for (let i = 0; i < arrayOfImages.length; i++)
                {
                  this.props.props.removeImage(arrayOfImages[i].id)
                }
            }
        }
        this.setState({ text: "" })
    }

    removeFile = (id) =>
    {
        this.props.props.removeImage(id);
        }
    render()
    {
        const arrayOfImages = [];
        Object.entries(this.props.props.imageUploads).map((e) =>
        {
            if (e[1])
                arrayOfImages.push(e[1])
        });
        let { showEmojiPicker } = this.state;
        return (
            <Fragment>
                {arrayOfImages.length ? <div className="preview row">
                    {arrayOfImages.length ? arrayOfImages.map(item =>
                    {
                        if (item)
                            return <Preview item={item} removeFile={this.removeFile}/>
                    }
                    )
                    : null}
                    <img src={process.env.PUBLIC_URL + '/images/addIc.png'} className="preview-add-icon" onClick={this.onClickUpload}/>
                    
                </div>:null}
            <div className="str-chat_input">
                <img src={process.env.PUBLIC_URL + '/images/addIcon.png'} className="add-icon" 
                     />
                    <input placeholder="Send Message" className="message-input" onChange={this.handleChange} value={this.state.text}/>
               
   
                {showEmojiPicker ?
                    <div style={{position:"absolute",top:90,right:0,bottom:0,left:750}}>
                    <OutsideClickHandler
                    onOutsideClick={this.togglePicker
                    } className="outside-handler">
                        <Picker include={["people", "recent"]}
                            onSelect={(item) =>
                            {
                                this.onSelectEmoji(item)
                            }}                      
                            />
                     </OutsideClickHandler> 
                            </div>
                : null}
                <img src={process.env.PUBLIC_URL + '/images/attachment.png'} className="input-icon"/>
                <img src={process.env.PUBLIC_URL + '/images/upload.png'} className="input-icon" onClick={this.onClickUpload}/>
                <input type="file" accept="image/*" style={{ visibility: "hidden", width: 0 }} ref={this.uploadRef} onChange={this.uploadFile }/>
                <img src={process.env.PUBLIC_URL + '/images/emoji.png'} className="input-icon" onClick={this.togglePicker} />
                <img src={process.env.PUBLIC_URL + '/images/send.png'} className="input-icon" onClick={this.sendMessage} />
                
                
                </div>
                </Fragment>
        )
    }
}

export default CustomMessagingInput
