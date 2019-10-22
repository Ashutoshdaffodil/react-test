import React, { Fragment, Component}from 'react';
import { Chat, Channel, withChannelContext,ChannelHeader, Thread, Window,withChatContext,ChannelList } from 'stream-chat-react';
import { MessageList, MessageInput,MessageInputSmall } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import { MessageLists } from "./MessageList";
import "./Style.css"
import CustomMessageInput from "./CustomMessageInput"
import CustomChannelHeader from "./CustomChannelHeader"
import 'stream-chat-react/dist/css/index.css';
import List from "./List"
// import {MessageInput} from "./"

const chatClient = new StreamChat('qk4nn7rpcn75');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoicmFzcHktZmVhdGhlci0xIn0.eO16zxKdHnpw1ZHxH4AHeLJyio1zkGvW71oXxccZrAk';
const MyContextAwareComponent = withChannelContext(
  List
);
const ContextAwareCustomChannelHeader = withChannelContext(CustomChannelHeader);


chatClient.setUser(
  {
       id: 'raspy-feather-1',
       name: 'Raspy feather',
       image: 'https://getstream.io/random_svg/?id=raspy-feather-1&name=Raspy+feather'
  },
  userToken,
);

 class App extends Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      channel:chatClient.channel('messaging', 'godevs', {
        // image: 'https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png',
        name: 'Talk about Go',
        threadOpen:false
      })
    }
   
  }
  setChannel=async (channel)=>
  {
    this.setState({ channel })
   
      // const response = await channel.delete();
      
  }
   toggleThread = (value) =>
   {
     this.setState({threadOpen:value})
    }

  render()
  {
    let {channel,threadOpen}=this.state ;
    return (
      <div className="row" style={{ width: "100%",marginLeft:20 ,backgroundColor: "white" }}>
        <div style={{ width: "70%" }}>
          <Chat client={chatClient} theme={'messaging light'}>
            <Channel channel={channel}>
              <div className="str-chat__main-panel" style={{ height: '600px' }}>
                <ContextAwareCustomChannelHeader />
                {/* <MessageList /> */}
                <MessageLists toggleThread={this.toggleThread}/>
                <MessageInput
                  Input={(props) => <CustomMessageInput props={props} />}
                />
              </div>
              <Thread />
    
            </Channel>
    
          </Chat>
        </div>
        {!threadOpen && <div className="channel-list-container">
          <Chat client={chatClient} theme={'messaging light'}>
            <Channel channel={channel}>
              <ChannelList options={{ state: true, limit: 8, watch: true }} List={(props) => <MyContextAwareComponent props={props} setChannel={this.setChannel} />} />
            </Channel>
          </Chat>
      
        </div>}
      </div>
    )
  }

}

export default withChannelContext(App);