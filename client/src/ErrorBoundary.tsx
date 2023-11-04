import { Component, ReactNode } from 'react';

import Typography from '@/components/ui/Typography';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className='flex h-screen w-screen items-center justify-center'>
          <div className='flex w-full flex-col items-center justify-center gap-6 p-6 sm:w-[500px]'>
            <Typography variant='title-1' component='h1'>
              Fatal error
            </Typography>
            <Typography variant='title-3' component='h2'>
              Please refresh the page or try again later
            </Typography>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
