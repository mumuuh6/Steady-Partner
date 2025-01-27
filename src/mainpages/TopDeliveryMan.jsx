import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TopDeliveryMen() {
    const deliveryMen = [
        {
          name: "John Doe",
          image: "https://via.placeholder.com/80", // Replace with actual image URL
          parcelsDelivered: 250,
          averageRating: 4.9,
        },
        {
          name: "Jane Smith",
          image: "https://via.placeholder.com/80", // Replace with actual image URL
          parcelsDelivered: 230,
          averageRating: 4.8,
        },
        {
          name: "Alex Johnson",
          image: "https://via.placeholder.com/80", // Replace with actual image URL
          parcelsDelivered: 240,
          averageRating: 4.7,
        },
        
      ]
      
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center hover:underline hover:text-green-800">Top Delivery Men</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 p-6">
        {deliveryMen.map((man, index) => (
          <Card key={index} className="border-2 border-dashed border-green-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex flex-col items-center p-4">
              <img
                src={man.image}
                alt={man.name}
                className="h-20 w-20 rounded-full object-cover border-2 border-primary"
              />
              <CardTitle className="text-xl font-bold mt-2 hover:underline hover:text-green-800">{man.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-center">
              <p className="text-sm text-muted-foreground">
                Parcels Delivered: <span className="font-bold">{man.parcelsDelivered}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Average Rating: <span className="font-bold">{man.averageRating} / 5</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
