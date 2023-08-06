"use client";

import EmptyState from "@/components/shared/EmptyState";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <EmptyState title="Uh Oh" subtitle="Something went wrong!" showReset />
  );
};

export default ErrorState;
