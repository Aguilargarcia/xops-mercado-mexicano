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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-tertiary-blue mb-4">
            Eventos cerca de ti
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre eventos exclusivos, ferias artesanales y experiencias únicas con las mejores marcas mexicanas
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video bg-gradient-to-br from-xops-blue/10 to-tertiary-blue/10 relative">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-sm font-medium text-tertiary-blue">{event.date}</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-tertiary-blue mb-3">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {event.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees} asistentes</span>
                  </div>
                </div>
                
                <Button className="w-full bg-xops-blue hover:bg-tertiary-blue text-white">
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