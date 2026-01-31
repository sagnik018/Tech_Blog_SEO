export function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Welcome to TechBlog
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-slide-up">
            Discover the latest insights, tutorials, and trends in technology, 
            programming, and software development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <button className="btn btn-primary bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105">
              Explore Articles
            </button>
            <button className="btn btn-outline border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Articles</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Categories</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Readers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
