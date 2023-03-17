import React from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";
import chatapi from "./api.js";


export default function App() {
  const { messages, appendMsg, setTyping } = useMessages([]);

  function handleSend(type, val) {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right"
      });

      setTyping(true);

      setTimeout(() => {
        chatapi(val).then((data) => {
          appendMsg({
            type: "html",
            content: data,
          });
        });
      }, 1000);
    }
  }

  function renderMessageContent(msg) {
    const { content, type } = msg;
    // 根据消息类型来渲染
    switch (type) {
      case 'text':
        return <Bubble content={content.text} />;
      case 'html':
        return (
          <Bubble content={
            <div dangerouslySetInnerHTML={{ __html: content }} />
          } />
        );
      default:
        return null;
    }
  }

  return (
    <Chat
      navbar={{ title: "ChatGPT" }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
    />
  );
}
