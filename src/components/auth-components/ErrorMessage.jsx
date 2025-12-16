const ErrorMessage = ({ message }) => {
  if (!message) return null
  return (
    <span className="ml-2 mt-1 text-xs font-medium text-red-500 dark:text-red-400">
      {message}
    </span>
  )
}
export default ErrorMessage
