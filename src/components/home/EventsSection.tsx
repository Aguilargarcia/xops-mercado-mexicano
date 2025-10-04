import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users } from 'lucide-react';

const EventsSection = () => {
  const events = [
    {
      id: 1,
      title: "Mercado Artesanal CDMX",
      date: "25 Sep 2024",
      time: "10:00 - 18:00",
      location: "Plaza de la Constitución",
      attendees: 150,
      image: "/placeholder.svg",
      description: "Feria de productos artesanales mexicanos con más de 50 marcas locales"
    },
    {
      id: 2,
      title: "Festival de Diseño Mexicano",
      date: "28 Sep 2024", 
      time: "16:00 - 22:00",
      location: "Centro Cultural",
      attendees: 200,
      image: "/placeholder.svg",
      description: "Celebración del diseño y creatividad mexicana contemporánea"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-xops-black mb-3">
            Eventos cerca de ti
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Descubre eventos exclusivos, ferias artesanales y experiencias únicas con las mejores marcas mexicanas
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-[16/7] bg-gradient-to-br from-xops-black/5 to-xops-black/10 relative">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1">
                  <span className="text-xs font-medium text-xops-black">{event.date}</span>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-xops-black mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-3 text-sm">
                  {event.description}
                </p>
                
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Users className="w-3.5 h-3.5" />
                    <span>{event.attendees} asistentes</span>
                  </div>
                </div>
                
                <Button className="w-full bg-xops-black hover:bg-xops-black/90 text-white">
                  Ver detalles
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;