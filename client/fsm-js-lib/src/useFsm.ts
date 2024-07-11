import { useState, useCallback } from 'react';
import FSM from './fsm';

const useFsm = (fsmInstance: FSM) => {
	const [currState, setCurrState] = useState(fsmInstance.getState());

	const transition = useCallback((event: string) => {
		fsmInstance.transition(event);
		setCurrState(fsmInstance.getState());
	}, [fsmInstance]);

	return { state: currState, transition };
};

export default useFsm;