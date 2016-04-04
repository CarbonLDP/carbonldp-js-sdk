interface Committer<E> {
    commit(object: E): Promise<any>;
}
export default Committer;
