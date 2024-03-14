// Task 1
class EventEmitter {
    listeners = {};

    addListener(event, fn) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);
        return this;
    }

    on(event, fn) {
        return this.addListener(event, fn);
    }

    removeListener (event, fn) {
        let lis = this.listeners[event];
        if (!lis) return this;
        for(let i = lis.length; i > 0; i--) {
            if (lis[i] === fn) {
                lis.splice(i,1);
                break;
            }
        }
        return this;
    }

    off(event, fn) {
        return this.removeListener(event, fn);
    }

    once(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        const onceWrapper = () => {
            fn();
            this.off(eventName, onceWrapper);
        }
        this.listeners[eventName].push(onceWrapper);
        return this;
    }

    emit(eventName, ...args) {
        let fns = this.listeners[eventName];
        if (!fns) return false;
        fns.forEach((f) => {
            f(...args);
        });
        return true;
    }

    listenerCount(eventName) {
        let fns = this.listeners[eventName] || [];
        return fns.length;
    }

    rawListeners(event) {
        return this.listeners[event];
    }
}

const myEmitter = new EventEmitter();

function c1() {
    console.log('an event occurred!');
}

function c2() {
    console.log('yet another event occurred!');
}

myEmitter.on('eventOne', c1); // Register for eventOne
myEmitter.on('eventOne', c2); // Register for eventOne

// Register eventOnce for one time execution
myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
myEmitter.once('init', () => console.log('init once fired'));

// Register for 'status' event with parameters
myEmitter.on('status', (code, msg)=> console.log(`Got ${code} and ${msg}`));


myEmitter.emit('eventOne');

// Emit 'eventOnce' -> After this the eventOnce will be
// removed/unregistered automatically
myEmitter.emit('eventOnce');


myEmitter.emit('eventOne');
myEmitter.emit('init');
myEmitter.emit('init'); // Will not be fired
myEmitter.emit('eventOne');
myEmitter.emit('status', 200, 'ok');

// Get listener's count
console.log(myEmitter.listenerCount('eventOne'));

// Get array of rawListeners//
// Event registered with 'once()' will not be available here after the
// emit has been called
console.log(myEmitter.rawListeners('eventOne'));

// Get listener's count after remove one or all listeners of 'eventOne'
myEmitter.off('eventOne', c1);
console.log(myEmitter.listenerCount('eventOne'));
myEmitter.off('eventOne', c2);
console.log(myEmitter.listenerCount('eventOne'));


console.log('End of Task 1, beginning of Task 2');

// Task 2
import * as https from 'https';
class WithTime extends EventEmitter {
    execute(asyncFunc, ...args) {
        this.emit('begin');
        console.time('execute');
        this.on('data', (data) => console.log('Received data', data));
        asyncFunc(...args, (err, data) => {
            if (err) {
                return console.error(err);
            }
            this.emit('data', data);
            console.timeEnd('execute');
            this.emit('end');
        });
    }
}

const fetchFromUrl = (url, cb) => {
    https.get(url, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            cb(null, JSON.parse(data));
        });

    }).on('error', (err) => {
        console.log("Error: " + err.message);
        cb(err.message);
    });
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');

console.log(withTime.rawListeners("end"));