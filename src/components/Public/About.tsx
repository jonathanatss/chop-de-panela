import React from 'react';
import { EventInfo } from '../../types';

interface AboutProps {
  eventInfo: EventInfo;
}

const About: React.FC<AboutProps> = ({ eventInfo }) => {
  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-foreground mb-8 font-beer-heading">
          A Nossa História
        </h2>
        
        <div className="bg-card rounded-lg shadow-foam p-8 md:p-12 border border-border/50">
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {eventInfo.aboutText}
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background rounded-md p-6 border border-border">
              <h3 className="font-semibold text-xl text-foreground mb-4 font-beer-heading">
                Como Participar
              </h3>
              <p className="text-muted-foreground">
                Escolha um presente da nossa lista de desejos e ajude-nos a começar a nossa vida juntos com tudo o que precisamos para o nosso lar.
              </p>
            </div>
            
            <div className="bg-background rounded-md p-6 border border-border">
              <h3 className="font-semibold text-xl text-foreground mb-4 font-beer-heading">
                PIX Disponível
              </h3>
              <p className="text-muted-foreground">
                Prefere contribuir via PIX? Temos essa opção disponível para facilitar a sua participação no nosso chá de panela.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
