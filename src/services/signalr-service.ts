import * as signalR from '@microsoft/signalr';
import { API } from '../constant';
import { SignalRHub } from '../endpoints';

class SignalRService {
  private connection: signalR.HubConnection;
  private interval: any;
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${API}${SignalRHub}`)
      .withAutomaticReconnect()
      .build();
  }

  public async start(): Promise<void> {
    try {
      await this.connection.start();
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

  public async register(group: string) {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      await this.connection.invoke('Register', group);
      this.reconnect();
    }
  }
  private reconnect() {
    this.interval = setInterval(() => {
      console.log('reconnecting....');
      if (this.connection.state !== signalR.HubConnectionState.Connected) {
        console.log('stablishing connection....');
        this.connection.start();
      }
    }, 5000);
  }

  public async unregister(group: string) {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      await this.connection.invoke('Unregister', group);
      clearInterval(this.interval);
    }
  }
}

export const signalRService = new SignalRService();
