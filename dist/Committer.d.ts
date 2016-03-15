/// <reference path="../typings/typings.d.ts" />
interface Committer<E> {
    commit(object: E): Promise<any>;
}
export default Committer;
