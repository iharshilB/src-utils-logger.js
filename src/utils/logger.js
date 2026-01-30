/**
 * LOGGING UTILITIES
 * Structured logging for monitoring and debugging
 * 
 * DESIGN:
 * - Structured JSON logs for parsing
 * - Environment-aware (suppress in production if needed)
 * - Never expose sensitive data
 */

/**
 * Log incoming request
 */
export function logRequest(request, env) {
  const logEntry = {
    type: 'request',
    timestamp: new Date().toISOString(),
    method: request.method,
    url: request.url,
    headers: {
      'user-agent': request.headers.get('user-agent'),
      'content-type': request.headers.get('content-type')
    }
  };
  
  console.log(JSON.stringify(logEntry));
}

/**
 * Log error with context
 */
export function logError(context, error, env) {
  const logEntry = {
    type: 'error',
    timestamp: new Date().toISOString(),
    context: context,
    error: {
      message: error.message || String(error),
      name: error.name,
      stack: error.stack ? error.stack.substring(0, 500) : null
    }
  };
  
  console.error(JSON.stringify(logEntry));
}

/**
 * Log API call result
 */
export function logApiCall(apiName, success, durationMs, data = null) {
  const logEntry = {
    type: 'api_call',
    timestamp: new Date().toISOString(),
    api: apiName,
    success: success,
    durationMs: durationMs,
    dataSize: data ? JSON.stringify(data).length : 0
  };
  
  if (success) {
    console.log(JSON.stringify(logEntry));
  } else {
    console.warn(JSON.stringify(logEntry));
  }
    }
