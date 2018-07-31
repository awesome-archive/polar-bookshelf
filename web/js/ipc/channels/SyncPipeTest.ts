import {func} from 'prop-types';
import {assert} from 'chai';
import {Promises} from '../../util/Promises';
import {MockPipes} from './MockPipes';
import {SyncPipe} from './SyncPipe';

describe('SyncPipe', function() {

    it("create sync pipes L->R", async function () {

        let mockChannels: MockPipes<any, string> = MockPipes.create();

        let left = new SyncPipe(mockChannels.left);
        let right = new SyncPipe(mockChannels.right);

        let leftPromise = Promises.withTimeout(1, async () => await left.sync())
        let rightPromise = Promises.withTimeout(1, async () => await right.sync())

        await Promise.all([leftPromise, rightPromise]);

    });

    it("create sync pipes R->L", async function () {

        let mockChannels: MockPipes<any, string> = MockPipes.create();

        let left = new SyncPipe(mockChannels.left);
        let right = new SyncPipe(mockChannels.right);

        let leftPromise = Promises.withTimeout(1, async () => await left.sync())
        let rightPromise = Promises.withTimeout(1, async () => await right.sync())

        await Promise.all([rightPromise, leftPromise]);

    });


});
