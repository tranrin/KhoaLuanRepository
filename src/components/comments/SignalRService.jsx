import React, { useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const SignalRService = ({ token }) => {
  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_URI_Local + 'CommentChat', 
    //   {
    //     headers: {
    //       'Authorization': ` ${token}`
    //     }
    //   }
      )
      .build();

    connection.start()
      .then(() => {
        console.log('Connected to SignalR server');
        // Perform any additional setup or event subscriptions here
      })
      .catch((error) => {
        console.error('Failed to connect to SignalR server: ', error);
      });

    return () => {
      connection.stop(); // Clean up the connection when the component unmounts
    };
  }, [token]);

  return <></>;
};

export default SignalRService;
