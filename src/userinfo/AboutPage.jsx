import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Steady Partner
      </motion.h1>

      <motion.p
        className="text-lg text-gray-600 max-w-3xl mx-auto mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Steady Partner is your go-to parcel delivery solution. We ensure safe, reliable, and
        efficient delivery services. Whether you're sending important documents or
        personal packages, we handle them with utmost care.
      </motion.p>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-3">🚀 Fast & Secure</h2>
            <p className="text-gray-600">
              We prioritize speed and safety, ensuring your parcels reach their
              destination on time and in perfect condition.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-3">📍 Live Tracking</h2>
            <p className="text-gray-600">
              Stay updated with real-time tracking and get notified about your
              parcel’s journey.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-3">👨‍💼 Trusted Delivery</h2>
            <p className="text-gray-600">
              Our professional delivery personnel ensure secure and
              hassle-free delivery every time.
            </p>
          </CardContent>
        </Card>
      </div>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Button className="px-6 py-2 text-lg" onClick={() => alert("Explore our services!")}>Learn More</Button>
      </motion.div>
    </div>
  );
}
