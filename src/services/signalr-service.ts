import * as signalR from '@microsoft/signalr';
import { API } from '../constant';
import { SignalRHub } from '../endpoints';

class SignalRService {
  private connection: signalR.HubConnection;
  private interval: any;
  public eventId: string | undefined;
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${API}${SignalRHub}`)
      .withAutomaticReconnect([0, 2000, 5000, 10000])
      .build();
  }

  public async start(): Promise<void> {
    try {
      this.connection.onreconnecting((error) => {
        console.log('Reconnecting...', error);
      });

      this.connection.onreconnected((connectionId) => {
        console.log('Reconnected!', connectionId);
        this.register();
      });

      this.connection.onclose(async () => {
        console.log('Connection closed. Will restart...');
        await this.start();
      });

      await this.connection.start();
      await this.register();
    } catch (error) {
      setTimeout(() => this.start(), 3000);
    }
  }

  public onNewInventory(callback: (message: string) => void) {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      this.connection.on('NewInventory', callback);
    }
  }

  public onNewScanCount(callback: (message: string) => void) {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      this.connection.on('NewScanCount', callback);
    }
  }

  public async register() {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      await this.connection.invoke('Register', this.eventId?.toString());
      // this.reconnect();
    }
  }
  // private reconnect() {
  //   this.interval = setInterval(() => {
  //     console.log('reconnecting....');
  //     if (this.connection.state !== signalR.HubConnectionState.Connected) {
  //       if (this.connection.state !== signalR.HubConnectionState.Disconnected) {
  //         this.connection.state =
  //       }
  //       console.log('stablishing connection....');
  //       this.connection.start();
  //     }
  //   }, 5000);
  // }

  public async unregister(group: string) {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      await this.connection.invoke('Unregister', group);
      clearInterval(this.interval);
    }
  }
}

export const signalRService = new SignalRService();
