import {Pipe, PipeListener, PipeNotification} from './Pipe';

/**
 * Provides a pipe that syncs with the remote pipe so that they are both
 * in the ready state.
 *
 */
export class SyncPipe {

    private delegate: Pipe<any,string>;

    public constructor(delegate: Pipe<any,string>) {
        this.delegate = delegate;
    }

    async sync(): Promise<void> {

        // must use the create-then-await pattern or else there may be a chance
        // we miss the response notification event if we're the second waiter.
        let establishPromise = this.delegate.when('establish');

        this.delegate.write('establish', 'sync');

        await establishPromise;

        this.delegate.write('establish', 'sync');

    }

}
