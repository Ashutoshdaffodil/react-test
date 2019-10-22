import { withChannelContext } from "stream-chat-react";
import React, { Component } from "react";
import Moment from "moment";
import _ from "lodash";
import { NimbleEmoji,Picker } from "emoji-mart";
import { emojiSetDef, emojiData, defaultMinimalEmojis } from "./utils";
import "./Style.css";
import { isObject } from "lodash";
class MessageList extends Component
{
  constructor(props)
  {
    super(props)
    this.state={
      showPicker: false, currentPicker:null,data:null,event:null
    }
  }
  deleteMessage = async (event, data) =>
  {
    event.preventDefault();
    let currentUser = this.props.client.userID;
    if (currentUser === data.user.id)
    {
      let response = await this.props.client.deleteMessage(data.id);
      this.props.updateMessage(response.message);
    } else
    {
      console.log("Error Deleting message");
    }
  };
  pickerReaction = (name) =>
  {
    let data=this.state.data
    let userExistingReaction = null;

    const currentUser = this.props.client.userID;
    for (const reaction of data.own_reactions)
    {
      if (currentUser === reaction.user.id && reaction.type === "wow")
      {
        userExistingReaction = reaction;
      } else if (currentUser !== reaction.user.id)
      {
        console.warn(`Message contained reactions from a different user`);
      }
    }
    if (userExistingReaction)
    {
      this.props.channel.deleteReaction(data.id, userExistingReaction.type);
    } else
    {
      const reaction = { type: "wow" };
      this.props.channel.sendReaction(data.id, reaction);
    }
  }
  addReaction = async (event, data) =>
  {
    event.preventDefault();
    this.setState({ showPicker: true,event,data })
    
  
  };
  componentDidUpdate(prevProps)
  {
    // if(prevProps.thr)
    if (prevProps.thread != this.props.thread)
    {
      this.props.toggleThread(isObject(this.props.thread));
    }
  }
  render()
  {

    const reactionsEmojis = defaultMinimalEmojis.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {});
    let allMessages = [...this.props.messages];
    allMessages.sort(function (a, b)
    {
      return a.created_at - b.created_at;
    });
    let filtered_data = _.filter(allMessages, data =>
    {
      return data.type === "regular";
    });
    let sorted_data = _.groupBy(filtered_data, data =>
    {
      return Moment(data.created_at)
        .startOf("day")
        .format();
    });
    return (
      <div style={{ flex: 1, backgroundColor: "white", overflow: "auto",position:"relative" }}>
        {Object.keys(sorted_data).map(value => (
          <div>
            <div class="date_seperater">
              <hr className="chat__date-separator-line" />
              <p style={{ fontSize: "15px", color: "black", fontFamily: "Helvetica Neue" }}>
                {Moment(value).calendar(null, {
                  lastDay: "[Yesterday]",
                  sameDay: "[Today]",
                  nextDay: "[Tomorrow]",
                  lastWeek: "[Last] MMMM",
                  nextWeek: "MMMM",
                  sameElse: "L"
                })}
              </p>
              <hr class="chat__date-separator-line" />
            </div>
            {sorted_data[value].map((data, index) =>
            {
              let filter_message = false;
              if (index != 0)
              {
                filter_message = data["user"]["id"] === sorted_data[value][index - 1]["user"]["id"];
              }
              return (
                <div class="message_wrapper">
                  {!filter_message && (
                    <img src={data.user.image} style={{ width: 36, height: 36, overflow: "hidden" }} />
                  )}
                  {filter_message && <div class="new_message_date">{Moment(data.created_at).format("h:mm,a")}</div>}
                  {
                    <div style={{ marginLeft: filter_message ? 55 : 20 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        {!filter_message && <div class="user_name">{data.user.name}</div>}
                        {!filter_message && <div class="message_date">{Moment(data.created_at).format("h:mm a")}</div>}
                      </div>
                      <div class="message_style">{data.text}</div>

                      {data.attachments &&
                        data.attachments.length > 0 &&
                        data.attachments.map(item => (
                          <div style={{ marginTop: 10, marginBottom: 10 }}>
                            <img src={item.image_url} class="attached_photo" />
                          </div>
                        ))}
                      {data.latest_reactions && data.latest_reactions.length > 0 && (
                        <div class="chat_message_emotions">
                          {data.latest_reactions.map(item => (
                            <li class="checked">
                              <NimbleEmoji
                                emoji={reactionsEmojis[item.type]}
                                size={16}
                                {...emojiSetDef}
                                data={emojiData}
                              />
                              <div style={{ marginLeft: "4px", fontSize: "11px", color: "#131313" }}>1</div>
                            </li>
                          ))}
                        </div>
                      )}
                      {data.reply_count > 0 && (
                        <div class="chat_message_thread">
                          <div class="user_image">
                            <img src={data.user.image} style={{ borderRadius: "6px" }} />
                          </div>
                          <span class="replies_style">{data.reply_count} replies</span>
                          <p
                            style={{paddingTop:"10px"}}
                            onClick={e =>
                            {
                              this.props.openThread(data, e);
                            }}
                          >
                            View Thread
                          </p>
                        </div>
                      )}
                    </div>
                  }
                  <div class="chat_message_more_actions">
                    <button
                      type="button"
                      class="chat_message_reply"
                      name="button"
                      onClick={e =>
                      {
                        this.props.openThread(data, e);
                      }}
                    />
                    <button
                      type="button"
                      class="chat_message_smile"
                      name="button"
                      onClick={event => this.addReaction(event, data)}
                    />
                    {this.props.client.userID === data.user.id && (
                      <button
                        type="button"
                        class="chat_message_more"
                        name="button"
                        onClick={event => this.deleteMessage(event, data)}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        
         {this.state.showPicker&&
          <div style={{position:"absolute",right:0,bottom:0}}>
          <Picker onSelect={(item) =>
          { 
            this.setState({showPicker:false})
          this.pickerReaction(item.id)
            }} />
        </div>
        }
      </div>
    );
  }
}
export const MessageLists = withChannelContext(MessageList);
