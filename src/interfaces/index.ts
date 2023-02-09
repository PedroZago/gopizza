export interface NativeFirebaseError {
  Error: ErrorConstructor;

  cause: unknown;

  /** Firebase error code, e.g. auth/invalid-email */
  code: 'auth/user-not-found' | 'auth/wrong-password';

  /** Firebase error message */
  message: string;

  name: string;

  /** The firebase module namespace that this error originated from, e.g. 'analytics'*/
  namespace: string;

  /** The native sdks returned error code, different per platform */
  nativeErrorCode: string | number;

  /** The native sdks returned error message, different per platform */
  nativeErrorMessage: string;

  stack: undefined | string;
}
