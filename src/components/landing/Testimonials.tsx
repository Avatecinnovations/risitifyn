export function Testimonials() {
  const testimonials = [
    {
      name: "David Miller",
      role: "Freelance Designer",
      content:
        "Risitify completely transformed my invoicing process. I now spend 75% less time on billing and get paid twice as fast. The recurring invoice feature is a game-changer!",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sarah Johnson",
      role: "Marketing Agency Owner",
      content:
        "The multi-currency features and automatic tax calculations have made international billing so much easier. My clients love the professional invoices and easy payment options.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Michael Chen",
      role: "Software Developer",
      content:
        "As someone who hates paperwork, Risitify has been a lifesaver. The interface is intuitive, and the automation features save me hours every month. Highly recommend!",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">What our clients say</h2>
          <p className="text-xl text-gray-600">
            Thousands of freelancers and small businesses trust Risitify for
            their invoicing needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card border border-gray-100"
            >
              <div className="mb-6">
                <p className="text-gray-700">{testimonial.content}</p>
              </div>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
