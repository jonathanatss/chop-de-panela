import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { EventInfo } from '../../types';

interface HeroProps {
  eventInfo: EventInfo;
}

const Hero: React.FC<HeroProps> = ({ eventInfo }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Data a definir';
    return new Date(`${dateString}T00:00:00`).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-foreground">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${eventInfo.heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-wider uppercase font-beer-heading text-shadow-glow">
            {eventInfo.brideNames}
          </h1>
          <p className="text-3xl md:text-4xl font-light mb-8 opacity-90 font-beer-heading tracking-wider">
            Nosso Chopp de Panela
          </p>
        </div>
        
        <div className="bg-card/80 backdrop-blur-md rounded-lg p-8 mx-auto max-w-3xl border border-border/50 shadow-foam">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <Calendar className="h-8 w-8 mb-3 text-primary" />
              <h3 className="font-semibold text-lg mb-1 uppercase tracking-wider font-beer-heading">Data</h3>
              <p className="text-sm opacity-90 text-center text-muted-foreground">
                {formatDate(eventInfo.eventDate)}
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 mb-3 text-primary" />
              <h3 className="font-semibold text-lg mb-1 uppercase tracking-wider font-beer-heading">Horário</h3>
              <p className="text-sm opacity-90 text-muted-foreground">
                {eventInfo.eventTime}
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 mb-3 text-primary" />
              <h3 className="font-semibold text-lg mb-1 uppercase tracking-wider font-beer-heading">Local</h3>
              <p className="text-sm opacity-90 text-center text-muted-foreground">
                {eventInfo.eventLocation}
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-sm opacity-75 text-muted-foreground">
              {eventInfo.eventAddress}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
