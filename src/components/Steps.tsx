const Steps = () => {
  const renderSteps = () => {
    const steps = [
      {
        title: "Assess",
        description: "Tell us about your drywall damage. Whether it's holes, cracks, water damage, or separating seams - describe the issue in detail."
      },
      {
        title: "Document",
        description: "Share clear photos of the damaged area. Include close-ups and wider shots to help us understand the full scope of repairs needed."
      },
      {
        title: "Quote",
        description: "Get an instant, detailed quote for your drywall repair. We'll break down labor, materials, and finishing requirements."
      },
      {
        title: "Schedule",
        description: "Book your repair with our drywall specialists. We'll match, patch, and texture to make the repair invisible."
      }
    ];

    return steps.map((step, index) => (
      <div key={index} className="space-y-6 group">
        <div className="min-h-[5rem] px-6 rounded-3xl bg-white shadow-sm flex items-center justify-center group-hover:scale-95 transition-transform duration-300">
          <h4 className="text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500">
            {step.title}
          </h4>
        </div>
        <p className="text-gray-500 leading-relaxed">
          {step.description}
        </p>
      </div>
    ));
  };

  return (
    <section className="px-6 py-32 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-4xl font-semibold text-center mb-20">
          Getting your quote.
          <br />
          <span className="text-gray-400 font-medium">As simple as that.</span>
        </h3>
        <div className="grid md:grid-cols-4 gap-16">
          {renderSteps()}
        </div>
      </div>
    </section>
  )
}

export default Steps;