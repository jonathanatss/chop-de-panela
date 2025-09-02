import React, { useState } from 'react';
import { Send, CreditCard, Copy, Check } from 'lucide-react';
import { EventInfo } from '../../types';

interface ContactProps {
  eventInfo: EventInfo;
  onSubmitMessage: (name: string, email: string, message: string) => void;
}

const Contact: React.FC<ContactProps> = ({ eventInfo, onSubmitMessage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await onSubmitMessage(formData.name, formData.email, formData.message);
    
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(eventInfo.pixKey);
      setPixCopied(true);
      setTimeout(() => setPixCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar PIX:', err);
    }
  };

  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-beer-heading">
            Deixe uma Mensagem
          </h2>
          <p className="text-lg text-muted-foreground">
            Deixe sua mensagem de carinho ou contribua via PIX
          </p>
        </div>

        {/* Container principal alterado para Flexbox responsivo */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Formulário de Contato - Ocupará 50% em telas grandes */}
          <div className="bg-card rounded-lg shadow-foam p-8 w-full lg:w-1/2 border border-border/50">
            <h3 className="text-2xl font-bold text-foreground mb-6 font-beer-heading">
              Escreva para nós
            </h3>
            
            {submitted && (
              <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-md text-success">
                ✅ Mensagem enviada com sucesso!
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-input rounded-md focus:ring-2 focus:ring-ring bg-background"
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-input rounded-md focus:ring-2 focus:ring-ring bg-background"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mensagem
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-input rounded-md focus:ring-2 focus:ring-ring bg-background"
                  placeholder="Escreva sua mensagem de felicitações..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-accent-foreground px-6 py-3 rounded-md hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-semibold"
              >
                <Send className="h-4 w-4" />
                <span>{isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}</span>
              </button>
            </form>
          </div>

          {/* Seção PIX - Ocupará 50% em telas grandes */}
          <div className="bg-gradient-foam rounded-lg shadow-foam p-8 w-full lg:w-1/2 border border-border/50">
            <div className="text-center mb-8">
              <CreditCard className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2 font-beer-heading">
                Contribuição via PIX
              </h3>
              <p className="text-muted-foreground">
                Prefere contribuir diretamente? Use nosso PIX abaixo
              </p>
            </div>
            
            <div className="bg-card rounded-md p-6 mb-6 border border-border">
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Chave PIX
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={eventInfo.pixKey}
                    readOnly
                    className="flex-1 px-4 py-3 border border-input rounded-md bg-background text-muted-foreground"
                  />
                  <button
                    onClick={copyPixKey}
                    className="px-4 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center space-x-2"
                  >
                    {pixCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>{pixCopied ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome do Beneficiário
                </label>
                <input
                  type="text"
                  value={eventInfo.pixName}
                  readOnly
                  className="w-full px-4 py-3 border border-input rounded-md bg-background text-muted-foreground"
                />
              </div>
            </div>
            
            <div className="bg-brand-amber-50 border border-brand-amber-200 rounded-lg p-4">
              <p className="text-brand-amber-800 text-sm">
                💡 <strong>Dica:</strong> Após fazer o PIX, envie-nos uma mensagem ao lado para que possamos agradecer pessoalmente!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
