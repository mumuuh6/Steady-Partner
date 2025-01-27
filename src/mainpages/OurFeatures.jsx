import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Lottie from "lottie-react"
import parcelSafetyAnimation from "../../public/ParcelSafety.json"
import fastDeliveryAnimation from "../../public/Fastdelivery.json"
import trackingAnimation from "../../public/realtime.json"

const features = [
  {
    animation: parcelSafetyAnimation,
    title: "Parcel Safety",
    description: "Your parcels are handled with utmost care, ensuring they arrive safely at their destination.",
  },
  {
    animation: fastDeliveryAnimation,
    title: "Super Fast Delivery",
    description: "Experience lightning-fast delivery times to meet your urgent needs.",
  },
  {
    animation: trackingAnimation,
    title: "Real-Time Tracking",
    description: "Track your deliveries in real-time with live updates at every step.",
  },
]

export default function OurFeatures() {
  return (
    <div className="grid gap-6 mt-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 p-6">
      {features.map((feature, index) => (
        <Card key={index} className="hover:shadow-2xl hover:rounded-xl transition-all duration-300">
          <CardHeader className="flex justify-center p-4">
            <Lottie animationData={feature.animation} loop autoplay style={{ height: 120 }} />
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
            <Button variant="outline" size="sm" className="mt-4">
              Learn More
            </Button>
          </CardContent>
          
        </Card>
      ))}
    </div>
  )
}
