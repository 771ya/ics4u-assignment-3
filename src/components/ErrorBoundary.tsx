import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
  componentStack: string | null;
};

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { componentStack: null, error: null, hasError: false };

  public static getDerivedStateFromError(error: Error): State {
    return { componentStack: null, error, hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({
      componentStack: info.componentStack ?? null,
      error,
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <style>{`
            .error-container {
              max-width: 1000px;
              margin: 0 auto;
              padding: 20px;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              font-family: sans-serif;
            }
            .error-title { text-align: center; font-size: 3rem; margin: 0; }
            .error-subtitle { text-align: center; font-size: 1.25rem; color: #007bff; margin: 10px 0; }
            .error-card { background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .error-section { margin-bottom: 16px; }
            .error-label { color: #e53e3e; font-weight: bold; display: block; margin-bottom: 4px; }
            .error-message { font-family: monospace; margin: 0; padding: 8px; background: #f9f9f9; border-radius: 4px; }
            .error-stack { font-family: monospace; font-size: 12px; background: #f9f9f9; padding: 16px; overflow-x: auto; border: 1px solid #eee; border-radius: 4px; margin: 0; }
            .error-footer { text-align: center; color: #666; font-size: 0.875rem; margin-top: 20px; }
          `}</style>
          <div className="error-container">
            <h1 className="error-title">Crap! 💩</h1>
            <h2 className="error-subtitle">Even the best ICS4U students run into bugs</h2>
            <div className="error-card">
              <div className="error-section">
                <span className="error-label">Error Message:</span>
                <p className="error-message">{this.state.error?.message}</p>
              </div>
              <div className="error-section">
                <span className="error-label">Error Stack Trace:</span>
                <pre className="error-stack">{this.state.componentStack || "No stack trace available."}</pre>
              </div>
            </div>
            <p className="error-footer">Take a deep breath, debug your logic and try again! You've got this. 🚀</p>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}
