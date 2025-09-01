import React from 'react';
import { EventInfo } from '../../types';

interface AboutProps {
  eventInfo: EventInfo;
}

const About: React.FC<AboutProps> = ({ eventInfo }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          Nossa História
        </h2>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            {eventInfo.aboutText}
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl p-6">
              <h3 className="font-semibold text-xl text-gray-800 mb-4">
                Como Participar
              </h3>
              <p className="text-gray-600">
                Escolha um presente da nossa lista de desejos e nos ajude a começar nossa vida juntos com tudo que precisamos para nosso lar.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl p-6">
              <h3 className="font-semibold text-xl text-gray-800 mb-4">
                PIX Disponível
              </h3>
              <p className="text-gray-600">
                Prefere contribuir via PIX? Temos essa opção disponível para facilitar sua participação em nosso chá de panela.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;