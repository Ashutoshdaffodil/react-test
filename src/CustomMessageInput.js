import React, { Component ,Fragment} from 'react'
import { MessageList, MessageInput } from 'stream-chat-react';
import OutsideClickHandler from 'react-outside-click-handler';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import Preview from "./Preview"
import _ from "lodash"
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
    componentDidMount() {
        document.addEventListener("keyup", (e) =>
        {
            if (e.key === "Enter")
            {
                this.sendMessage();
               }
       })
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
        console.log("itemmmmmmmmmm",item)
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
        arrayOfImages.filter(Boolean);
        let attachments = [];
        for (let i = 0; i < arrayOfImages.length; i++)
        {
            if(arrayOfImages[i])
            attachments.push({type:"image",image_url:arrayOfImages[i].url,asset_url:arrayOfImages[i].url})
        }
        if (text && attachments.length)
        {
            console.log("1",text,attachments)
            const response = await channel.sendMessage({ text:text,attachments: attachments })
            if (response)
            {
                for (let i = 0; i < arrayOfImages.length; i++)
                {
            if(arrayOfImages[i])
                  this.props.props.removeImage(arrayOfImages[i].id)
                }
        arrayOfImages.filter(Boolean);

            }   
            }
       else if (text && !attachments.length)
        {
            console.log("2",text,attachments)

            const response = await channel.sendMessage({ text:text })
         
        }
        
        else if(attachments.length && !text)
        {
            console.log("3",text,attachments)

            const response = await channel.sendMessage({ attachments: attachments })
            if (response)
            {
                for (let i = 0; i < arrayOfImages.length; i++)
                {
            if(arrayOfImages[i])
                  this.props.props.removeImage(arrayOfImages[i].id)
                }
        arrayOfImages.filter(Boolean);

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
        let { thread } = this.props.props;
        let { text } = this.state;
        const arrayOfImages = [];
        Object.entries(this.props.props.imageUploads).map((e) =>
        {
            if (e[1])
                arrayOfImages.push(e[1])
        });
        let { showEmojiPicker } = this.state;
        return (
            
            < Fragment >
            {
                arrayOfImages.length ? <div className="preview row" >
                    {arrayOfImages.length ? arrayOfImages.map(item =>
                    {
                        if (item)
                            return <Preview item={item} removeFile={this.removeFile} />
                    }
                    )
                        : null}
                    <img src={process.env.PUBLIC_URL + '/images/addIc.png'} className="preview-add-icon" onClick={this.onClickUpload} />
                    
                </div> : null
            }
            < div className = "str-chat_input" >
                <img src={process.env.PUBLIC_URL + '/images/addIcon.png'} className="add-icon"
                />
                <input placeholder="Send Message" className="message-input" onChange={this.handleChange} value={text} />
               
   
                {
            showEmojiPicker ?
                <div style={{ position: "absolute", top: 90, right: 0, bottom: 0, left: 750 }}>
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
                : null
        }
        <img
            src={"data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='38'><defs><filter id='a'><feFlood flood-color='%23868686' flood-opacity='1' result='floodOut'/><feComposite operator='atop' in='floodOut' in2='SourceGraphic' result='compOut'/><feBlend in='compOut' in2='SourceGraphic'/></filter></defs><g filter='url(%23a)'><path fill-rule='evenodd' d='M36.254 3.753c-4.985-5.004-13.098-5.004-18.083 0L2.669 19.312c-3.561 3.574-3.561 9.39.001 12.965a9.082 9.082 0 006.458 2.68 9.09 9.09 0 006.459-2.68l14.209-14.262a5.52 5.52 0 000-7.779 5.471 5.471 0 00-7.75 0l-9.292 9.326a1.838 1.838 0 00-.001 2.593c.714.716 1.87.716 2.584 0l9.292-9.326a1.825 1.825 0 012.584-.001 1.841 1.841 0 01-.001 2.594L13.004 29.684a5.473 5.473 0 01-7.751 0 5.523 5.523 0 01-.001-7.78L20.754 6.346c3.561-3.574 9.356-3.574 12.917 0a9.127 9.127 0 012.675 6.483c0 2.448-.95 4.751-2.675 6.482L18.17 34.87a1.84 1.84 0 000 2.593 1.82 1.82 0 002.584 0l15.5-15.559A12.771 12.771 0 0040 12.829c0-3.429-1.33-6.652-3.746-9.076z'/></g></svg>"}
            // src={process.env.PUBLIC_URL + '/images/attachment.png'}
            className="input-icon" />
            <img
                src={"data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' height='512' viewBox='0 -18 512 512' width='512'><path d='M512 60.055V312.28h-40.035V60.055c0-11.04-8.98-20.02-20.02-20.02H60.055c-11.04 0-20.02 8.98-20.02 20.02v151.484l82.82-121.043 66.43 83.035 30.102-43.27 128.465 167.005v15.015H308.89l-87.88-114.246-112.495 161.711-32.868-22.863 89.79-129.07-40.07-50.086L40.034 282.44v97.903c0 11.035 8.98 20.015 20.02 20.015h204.722v40.04H60.055C26.94 440.398 0 413.456 0 380.343V60.054C0 26.942 26.941 0 60.055 0h391.89C485.06 0 512 26.937 512 60.055zM377.879 192.172c-33.113 0-60.055-26.942-60.055-60.055s26.942-60.054 60.055-60.054 60.055 26.94 60.055 60.054c0 33.113-26.942 60.055-60.055 60.055zm20.02-60.055c0-11.039-8.981-20.015-20.02-20.015-11.04 0-20.02 8.976-20.02 20.015 0 11.04 8.98 20.02 20.02 20.02 11.039 0 20.02-8.98 20.02-20.02zm30.027 136.125h-40.04v84.074h-84.073v40.036h84.074v84.078h40.039v-84.078H512v-40.036h-84.074zm0 0' data-original='%23000000' class='active-path' data-old_color='%23000000' fill='%23868686'/></svg>"}
                // src={process.env.PUBLIC_URL + '/images/upload.png'}
                className="input-icon" onClick={this.onClickUpload} />
            <input type="file" accept="image/*" style={{ visibility: "hidden", width: 0 }} ref={this.uploadRef} onChange={this.uploadFile} />
            <img
                src={"data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='38' height='38'><path fill-rule='evenodd' fill='%23868686' d='M32.44 5.53c-7.42-7.417-19.491-7.417-26.908-.001-7.42 7.416-7.419 19.484 0 26.901 7.417 7.415 19.488 7.415 26.907-.001 7.418-7.416 7.417-19.483.001-26.899zm-2.077 24.824c-6.273 6.272-16.482 6.273-22.756.001-6.275-6.273-6.274-16.48 0-22.752 6.274-6.271 16.482-6.272 22.757.001 6.274 6.272 6.273 16.478-.001 22.75zM11.888 13.831a2.224 2.224 0 114.448.002 2.224 2.224 0 01-4.448-.002zm10.083 0a2.225 2.225 0 014.449 0 2.224 2.224 0 01-4.449 0zm5.258 9.106c-1.378 3.186-4.606 5.244-8.222 5.244-3.695 0-6.941-2.069-8.272-5.271a1.074 1.074 0 01.994-1.488c.421 0 .821.249.993.663.996 2.397 3.463 3.946 6.285 3.946 2.757 0 5.209-1.55 6.247-3.948a1.075 1.075 0 111.975.854z'/></svg>"}
                // src={process.env.PUBLIC_URL + '/images/emoji.png'}
                className="input-icon" onClick={this.togglePicker} />
                    {
        arrayOfImages.length || text !== "" ? <img
            src={"data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='36' height='32'><path fill-rule='evenodd' fill='%23868686' d='M34.788 13.691L4.952 1.266a3.54 3.54 0 00-3.706.6A3.573 3.573 0 00.123 5.461l2.656 10.452h13.002c.598 0 1.084.487 1.084 1.087 0 .601-.485 1.088-1.084 1.088H2.779L.123 28.54a3.573 3.573 0 001.123 3.595 3.542 3.542 0 003.706.6l29.836-12.424c1.358-.566 2.202-1.834 2.202-3.311 0-1.476-.844-2.744-2.202-3.309z'/></svg>"}
            // src={process.env.PUBLIC_URL + '/images/send.png'}
            className="input-icon" onClick={this.sendMessage} /> : null
        }
                
                
                </div >
                </Fragment >
         
        )
    }
}

export default CustomMessagingInput
