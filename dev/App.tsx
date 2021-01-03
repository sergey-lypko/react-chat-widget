import React, { Component } from "react";

import { Widget, addResponseMessage, setQuickButtons, toggleMsgLoader, addLinkSnippet } from "../index";
import { addUserMessage } from "..";

const mockJSON = {
  firstStepId: "stepId199",
  script: {
    stepId199: {
      message: "Hi! How can I help you today?",
      quickResponses: [
        {
          label: "What is your phone number?",
          value: "stepId200",
        },
      ],
    },
    stepId202: {
      message: "Our address is #56, 56th Ave. Please come visit us!",
      quickResponses: [
        {
          label: "What is hello?",
          value: "stepId199",
        },
        {
          label: "\u042b\u0435\u0437\u0449\u0432?",
          value: "stepId203",
        },
        {
          label: "And what is your phone number?",
          value: "stepId200",
        },
        {
          label: "And what is your email?",
          value: "stepId201",
        },
      ],
    },
    stepId200: {
      message: "Our phone number is (024) 234-4562\nCall us 24/7",
      quickResponses: [],
    },
    stepId201: {
      message: "Our email address is email.address@example.com",
      quickResponses: [
        {
          label: "What is your phone number?",
          value: "stepId200",
        },
      ],
    },
    stepId203: {
      message: "adsfadsfads",
      quickResponses: [
        {
          label: "sdfasdf",
          value: "stepId199",
        },
      ],
    },
  },
  phoneNumberParameters: {},
  testimonials: [],
  credibilityBuilders: [],
};

function fetchMockJSON() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockJSON);
    }, 500);
  });
}

export default class App extends Component {
  componentDidMount() {
    addResponseMessage("Welcome to this awesome chat!");
    addLinkSnippet({ link: "https://google.com", title: "Google" });
    addResponseMessage("![](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)");
    addResponseMessage("![vertical](https://d2sofvawe08yqg.cloudfront.net/reintroducing-react/hero2x?1556470143)");
  }

  handleNewUserMessage = (newMessage: any) => {
    toggleMsgLoader();
    setTimeout(() => {
      toggleMsgLoader();
      addResponseMessage(newMessage);
    }, 2000);
  };

  handleQuickButtonClicked = (e: any) => {
    addResponseMessage("Selected " + e);
    setQuickButtons([]);
  };

  handleSubmit = (msgText: string) => {
    if (msgText.length < 80) {
      addUserMessage("Uh oh, please write a bit more.");
      return false;
    }
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
