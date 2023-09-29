enum EventTypes
{
    infected = "infected",
}

class Events implements EventTarget
{
    addEventListener(type: EventTypes, callback: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void
    {
        window.addEventListener(type, callback, options);
    }
    dispatchEvent(event: Event): boolean
    {
        return window.dispatchEvent(event);
    }
    removeEventListener(type: EventTypes, callback: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void
    {
        window.addEventListener(type, callback, options);
    }

}