import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { EventInfo } from '../../types';

interface HeroProps {
  eventInfo: EventInfo;
}

const Hero: React.FC<HeroProps> = ({ eventInfo }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${eventInfo.heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            {eventInfo.brideNames}
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 opacity-90">
            Chá de Panela
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mx-auto max-w-2xl">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <Calendar className="h-8 w-8 mb-3 text-pink-300" />
              <h3 className="font-semibold text-lg mb-1">Data</h3>
              <p className="text-sm opacity-90 text-center">
                {formatDate(eventInfo.eventDate)}
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 mb-3 text-pink-300" />
              <h3 className="font-semibold text-lg mb-1">Horário</h3>
              <p className="text-sm opacity-90">
                {eventInfo.eventTime}
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 mb-3 text-pink-300" />
              <h3 className="font-semibold text-lg mb-1">Local</h3>
              <p className="text-sm opacity-90 text-center">
                {eventInfo.eventLocation}
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-sm opacity-75">
              {eventInfo.eventAddress}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;