/**
 * Interface for describing Route of react-router-dom.
 */
export interface IRoute {
  readonly path: string;
  readonly component: JSX.Element;
  readonly exact: boolean;
}
