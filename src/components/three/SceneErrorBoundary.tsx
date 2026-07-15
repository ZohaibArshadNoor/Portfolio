"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/** Catches WebGL / Three.js runtime failures so the rest of the page keeps working. */
export class SceneErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("[3D Scene Error]", error.message, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,229,255,0.12)_0%,_transparent_60%),radial-gradient(ellipse_at_70%_40%,_rgba(139,92,246,0.18)_0%,_transparent_50%)]"
            aria-hidden
          />
        )
      );
    }
    return this.props.children;
  }
}
