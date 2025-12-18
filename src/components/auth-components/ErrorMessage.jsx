const ErrorMessage = ({ message }) => {
  if (!message) return <span className="block ml-2 mt-1 min-h-4"></span>
  return (
    <span className="ml-2 mt-0.5 text-xs font-medium text-red-500 dark:text-red-400">
      {message}
    </span>
  )
}
export default ErrorMessage
