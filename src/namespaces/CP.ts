const namespace:string = 'http://carbonldp.com/ns/v1/patch#';

class Predicate {
	static ADD_ACTION:string = namespace + 'addAction';
	static SET_ACTION:string = namespace + 'setAction';
	static DELETE_ACTION:string = namespace + 'deleteAction';
}

//@formatter:off
export {
	namespace,
	Predicate
};
//@formatter:on