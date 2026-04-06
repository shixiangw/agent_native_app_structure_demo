function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Agent Native App
      </h1>
      <p className="text-lg text-gray-600 text-center max-w-md">
        A full-stack TypeScript application with an agent-native project structure.
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="/api/v1/health"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          API Health Check
        </a>
      </div>
    </section>
  )
}

export default HomePage
