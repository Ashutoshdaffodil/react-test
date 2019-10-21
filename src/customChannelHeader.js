import React from "react";
import { withChannelContext } from "stream-chat-react";
import "./Style.css";
class DemoComponent extends React.Component {
  render() {
    return (
      <div class="chat-header_wrapper">
        <div class="chat_header">
          <div>
            <span class="chat_header_info"># general</span>
            <div>
              <p class="user-count">5</p>
            </div>
          </div>
          <div>
            <span># general</span>
            <div>
              <p class="user-count">5</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export const Demo = withChannelContext(DemoComponent);
