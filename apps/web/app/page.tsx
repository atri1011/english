export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          AI Sentence Learning App
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Master English through intelligent sentence analysis, personalized learning paths, 
          and AI-powered feedback. Start your journey to fluent English today.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            Get started
          </button>
          <button className="text-sm font-semibold leading-6 text-foreground hover:text-foreground/80">
            Learn more <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          <div className="flex flex-col">
            <dt className="text-base font-semibold leading-7 text-foreground">
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-primary-foreground font-bold">AI</span>
              </div>
              AI-Powered Analysis
            </dt>
            <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
              <p className="flex-auto">
                Advanced AI algorithms analyze sentence structure, grammar, and context to provide personalized learning experiences.
              </p>
            </dd>
          </div>
          <div className="flex flex-col">
            <dt className="text-base font-semibold leading-7 text-foreground">
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-primary-foreground font-bold">📚</span>
              </div>
              Adaptive Learning
            </dt>
            <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
              <p className="flex-auto">
                Personalized learning paths that adapt to your progress, focusing on areas that need improvement.
              </p>
            </dd>
          </div>
          <div className="flex flex-col">
            <dt className="text-base font-semibold leading-7 text-foreground">
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-primary-foreground font-bold">🎯</span>
              </div>
              Real-time Feedback
            </dt>
            <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
              <p className="flex-auto">
                Instant feedback and corrections help you learn from mistakes and improve faster.
              </p>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}