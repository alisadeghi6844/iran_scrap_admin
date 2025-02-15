// EventEmitter.ts
type Callback = (data?: any) => void;

class EventEmitter {
  private events: { [key: string]: Callback[] } = {};

  public on(eventName: string, callback: Callback): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  public emit(eventName: string, data?: any): void {
    const event = this.events[eventName];
    if (event) {
      event.forEach(callback => callback(data));
    }
  }

  public off(eventName: string, callback: Callback): void {
    if (!this.events[eventName]) return;

    this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
  }
}

const eventEmitter = new EventEmitter();
export default eventEmitter;