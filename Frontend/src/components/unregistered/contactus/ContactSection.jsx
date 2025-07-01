import ContactInfo from "./ContactInfo";
import MessageForm from "./MessageForm";

const ContactSection = ({ contactRef }) => {
  return (
    <div ref={contactRef} className="mt-20">
      <h1 className="text-center text-[#003366]">Contact Us</h1>
      <ContactInfo />
      <MessageForm />
    </div>
  );
};

export default ContactSection;
