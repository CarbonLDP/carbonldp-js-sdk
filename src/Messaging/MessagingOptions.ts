/**
 * Options to configure in the messaging service.
 */
export interface MessagingOptions {
	/**
	 * The maximum numbers of reconnect attempts.
	 * Set to `null` of you don't want to set a limit.
	 */
	maxReconnectAttempts?:number;
	/**
	 * The milliseconds of wait to the next reconnection attempt.
	 */
	reconnectDelay?:number;
}
