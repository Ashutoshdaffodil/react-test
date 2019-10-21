import React from "react";
import { Chat, Channel, ChannelHeader, Thread, Window } from "stream-chat-react";
import { MessageInput, DateSeparator } from "stream-chat-react";
import { MessageLists } from "./MessageList";
// import { MessageInput } from "./MessageInput";
import { StreamChat } from "stream-chat";
import { Demo } from "./customChannelHeader";
// import "./Styles.css";
import "stream-chat-react/dist/css/index.css";

const chatClient = new StreamChat("qk4nn7rpcn75");
const userToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoibWlzdHktYmFyLTUifQ.ZrEXot-IyJpvgGD67ko285MN2lcuk19AJg_MyrQbARE";

chatClient.setUser(
  {
    id: "misty-bar-5",
    name: "Misty bar",
    image: "https://getstream.io/random_svg/?id=misty-bar-5&name=Misty+bar"
  },
  userToken
);

const channel = chatClient.channel("messaging", "godevs", {
  // add as many custom fields as you'd like
  image: "https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png",
  name: "Talk about Go"
});

const App = () => (
  <Chat client={chatClient} theme={"messaging light"}>
    <Channel channel={channel}>
      <Window>
        <Demo />
        <MessageLists />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  </Chat>
);

export default App;
