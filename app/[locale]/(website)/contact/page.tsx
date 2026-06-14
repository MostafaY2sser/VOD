const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background text-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000"
          alt="Contact Us"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/70 to-black/40" />

        <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
          <div>
            <span className="mb-4 inline-block rounded-full bg-primary px-4 py-1 text-sm font-medium">
              Support Center
            </span>

            <h1 className="mb-4 text-5xl font-bold md:text-7xl">
              Contact Us
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              Have questions, feedback, or need assistance? Our team is here to
              help you anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          {/* Contact Info */}
          <div>
            <span className="mb-3 inline-block rounded-full bg-primary/20 px-4 py-1 text-sm text-primary">
              Get In Touch
            </span>

            <h2 className="mb-6 text-4xl font-bold">
              We'd Love To Hear From You
            </h2>

            <p className="mb-8 text-gray-400 leading-8">
              Whether you have questions about subscriptions, technical issues,
              partnership opportunities, or feedback about our platform, feel
              free to reach out.
            </p>

            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-card p-5">
                <h3 className="mb-1 font-semibold">Email</h3>
                <p className="text-gray-400">
                  support@vodplatform.com
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-card p-5">
                <h3 className="mb-1 font-semibold">Phone</h3>
                <p className="text-gray-400">
                  +20 122 133 5281
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-card p-5">
                <h3 className="mb-1 font-semibold">Working Hours</h3>
                <p className="text-gray-400">
                  Monday - Sunday • 24/7 Support
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-white/10 bg-card p-8">
            <h3 className="mb-6 text-2xl font-semibold">
              Send a Message
            </h3>

            <form className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 outline-none transition focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 outline-none transition focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Enter subject"
                  className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 outline-none transition focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Message
                </label>

                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 outline-none transition focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-primary py-3 font-semibold text-white transition hover:opacity-90"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;