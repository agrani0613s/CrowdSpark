import "./ContactSection.css";

export default function ContactSection() {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-item">
          📧 <strong>Email:</strong> support@crowdspark.com
        </p>
        <p className="contact-item">
          📞 <strong>Phone:</strong> +91 98765 43210
        </p>
        <p className="contact-item">
          📍 <strong>Address:</strong> TIET, Patiala, India
        </p>
      </div>
    </section>
  );
}
