import React, { Fragment}from 'react';
import { Chat, Channel, withChannelContext,ChannelHeader, Thread, Window,withChatContext,ChannelList } from 'stream-chat-react';
import { MessageList, MessageInput,MessageInputSmall } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import { MessageLists } from "./MessageList";

import CustomMessageInput from "./CustomMessageInput"
import CustomChannelHeader from "./CustomChannelHeader"
import 'stream-chat-react/dist/css/index.css';
import List from "./List"
// import {MessageInput} from "./"

const chatClient = new StreamChat('qk4nn7rpcn75');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoicmFzcHktZmVhdGhlci0xIn0.eO16zxKdHnpw1ZHxH4AHeLJyio1zkGvW71oXxccZrAk';
const MyContextAwareComponent = withChatContext(
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

const channel = chatClient.channel('messaging', 'godevs', {
  image: 'https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png',
  name: 'Talk about Go',
});

const App = () => (
  <div style={{width:"100%"}}>
  <div style={{width:"70%"}}>
  <Chat client={chatClient} theme={'messaging light'}>
        <ChannelList options={{ member: true, watch: true }}
          List={(props) => <MyContextAwareComponent props={props} />} />
    <Channel channel={channel}>
    <div className="str-chat__main-panel" style={{ height: '600px' }}>
        <ContextAwareCustomChannelHeader />
            {/* <MessageList /> */}
        <MessageLists />
            
        <MessageInput
          Input={(props) => <CustomMessageInput props={props}/>}
        />
      </div>
      <Thread />
    </Channel>
  </Chat>
  </div>
    </div>
  // <Chat client={chatClient} theme={'messaging light'}>
  // <MyContextAwareComponent/>
  // <MyContextAwareComponent />
  // </Chat>

);

export default App;