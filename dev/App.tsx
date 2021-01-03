import React, { Component } from "react";

import { Widget, addResponseMessage, setQuickButtons, toggleMsgLoader, addLinkSnippet } from "../index";
import { addUserMessage } from "..";

export default class App extends Component {
  // componentDidMount() {
  //   addResponseMessage("Welcome to this awesome chat!");
  //   addLinkSnippet({ link: "https://google.com", title: "Google" });
  //   addResponseMessage("![](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)");
  //   addResponseMessage("![vertical](https://d2sofvawe08yqg.cloudfront.net/reintroducing-react/hero2x?1556470143)");
  // }

  handleNewUserMessage = (newMessage: any) => {
    toggleMsgLoader();
    setTimeout(() => {
      toggleMsgLoader();
      addResponseMessage(newMessage);
    }, 1000);
  };

  handleQuickButtonClicked = (e: any) => {
    addResponseMessage("Selected " + e);
    setQuickButtons([]);
  };

  handleSubmit = (msgText: string) => {
    // if (msgText.length < 80) {
    //   addUserMessage("Uh oh, please write a bit more.");
    //   return false;
    // }
    return true;
  };

  render() {
    return (
      <div>
        <Widget
          title="Bienvenido"
          subtitle="Asistente virtual"
          senderPlaceHolder="Escribe aquí ..."
          handleNewUserMessage={this.handleNewUserMessage}
          handleQuickButtonClicked={this.handleQuickButtonClicked}
          imagePreview
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
