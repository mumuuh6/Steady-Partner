import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CountUp from "react-countup"
import { FaShippingFast } from "react-icons/fa";
export default function AppStatistics() {
  

  const statsData = [
    {
      icon:<FaShippingFast></FaShippingFast>,
      title: "Parcels Booked",
      value: 2,
      description: "Total parcels booked on our platform.",
    },
    {
      title: "Parcels Delivered",
      value: 3,
      description: "Total parcels successfully delivered.",
    },
    {
      title: "Registered Users",
      value: 5,
      description: "Total number of users using our app.",
    },
  ]

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 p-6 mt-2">
      {statsData.map((stat, index) => (
        <Card key={index} className="border-2 border-dotted border-green-700 ">
          <CardHeader className="text-center p-4 ">
            
            <CardTitle className="text-2xl font-bold hover:underline hover:text-green-800">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary flex items-center justify-center">
              <CountUp start={0} end={stat.value} duration={2} separator="," />
              <p>+</p>
            </div>
            <p className="text-sm text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
