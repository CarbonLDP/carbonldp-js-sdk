/// <reference path="../typings/tsd.d.ts" />
interface Committer<E> {
    commit(object: E): Promise<any>;
}
export default Committer;
