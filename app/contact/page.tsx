import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero / Header Section */}
        <section className="bg-gray-100 py-16 px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out for admissions, queries, or feedback.
          </p>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
            <form className="space-y-4">
              
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Address:</strong><br />
                ABC School, Sector XX, City, State
              </p>

              <p>
                <strong>Phone:</strong><br />
                +91 9876543210
              </p>

              <p>
                <strong>Email:</strong><br />
                info@school.com
              </p>

              <p>
                <strong>Office Hours:</strong><br />
                Mon - Fri: 9:00 AM – 4:00 PM
              </p>
            </div>

            {/* Map Placeholder */}
            <div className="mt-6 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Map Placeholder</span>
            </div>
          </div>

        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
          }
