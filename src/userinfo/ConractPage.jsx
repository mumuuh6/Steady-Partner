import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
e.preventDefault();
    console.log("Form submitted:", formData);
    // Implement form submission logic here
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">Contact Us</h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
        Feel free to reach out to us with any questions or concerns!
      </p>
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex items-center gap-2">
          <Mail className="text-primary" />
          <p className="text-gray-700 dark:text-gray-300">mahmudaaktermumu7.com</p>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="text-primary" />
          <p className="text-gray-700 dark:text-gray-300">+8801963175097</p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="text-primary" />
          <p className="text-gray-700 dark:text-gray-300">Dhaka,Bangladesh</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        <Input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
        <Textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
        <Button type="submit" className="w-full flex items-center gap-2">
          <Send size={18} /> Send Message
        </Button>
      </form>
    </div>
  );
}
