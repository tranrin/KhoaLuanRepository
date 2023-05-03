import {ErrorBoundary} from 'react-error-boundary'

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div>
        <ErrorNotFound>
        </ErrorNotFound>
    </div>
  )
}

const ui = (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
  >
    <ComponentThatMayError />
  </ErrorBoundary>
)