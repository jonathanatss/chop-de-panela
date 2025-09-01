import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Calendar, 
  MapPin, 
  Clock, 
  CreditCard,
  User,
  FileText,
  Image,
  Heart
} from 'lucide-react';
import { EventInfo } from '../../types';

interface SettingsManagerProps {
  eventInfo: EventInfo;
  onUpdate: (updates: Partial<EventInfo>) => Promise<void>;
}

const SettingsManager: React.FC<SettingsManagerProps> = ({
  eventInfo,
  onUpdate
}) => {
  const [formData, setFormData] = useState(eventInfo);
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('evento');
  const [feedbackMessage, setFeedbackMessage] = useState('Salvar Alterações');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setFormData(eventInfo);
  }, [eventInfo]);

  useEffect(() => {
    setImageError(false);
  }, [formData.heroImage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedbackMessage('Salvando...');

    try {
      await onUpdate(formData);
      setFeedbackMessage('Salvo com Sucesso!');
    } catch (error) {
      console.error("Falha ao salvar as configurações:", error);
      setFeedbackMessage('Erro ao Salvar');
    } finally {
      setIsSaving(false);
      setTimeout(() => {
        setFeedbackMessage('Salvar Alterações');
      }, 2000);
    }
  };

  const sections = [
    { id: 'evento', label: 'Informações do Evento', icon: Heart },
    { id: 'pix', label: 'Configurações PIX', icon: CreditCard },
    { id: 'sobre', label: 'Sobre Nós', icon: FileText },
    { id: 'visual', label: 'Aparência', icon: Image }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Configurações do Site</h1>
        <p className="text-gray-600">Personalize as informações do seu chá de panela</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {sections.map((section) => (
              <button key={section.id} onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === section.id ? 'bg-pink-100 text-pink-700 font-medium' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <section.icon className="h-5 w-5" />
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
            {activeSection === 'evento' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Heart className="h-6 w-6 text-pink-500" />
                  <h2 className="text-2xl font-bold text-gray-800">Informações do Evento</h2>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nomes dos Noivos</label>
                  <input type="text" name="brideNames" value={formData.brideNames} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Ana & Carlos"/>
                  <p className="text-sm text-gray-500 mt-2">Este nome aparecerá no topo do site e em todo o conteúdo público.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2"><Calendar className="inline h-4 w-4 mr-1" />Data do Evento</label>
                        <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2"><Clock className="inline h-4 w-4 mr-1" />Horário</label>
                        <input type="time" name="eventTime" value={formData.eventTime} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"/>
                    </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2"><MapPin className="inline h-4 w-4 mr-1" />Nome do Local</label>
                  <input type="text" name="eventLocation" value={formData.eventLocation} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Salão de Festas Jardim"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Endereço Completo</label>
                  <input type="text" name="eventAddress" value={formData.eventAddress} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Rua das Flores, 123 - Centro"/>
                </div>
              </div>
            )}
            {activeSection === 'pix' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <CreditCard className="h-6 w-6 text-green-500" />
                  <h2 className="text-2xl font-bold text-gray-800">Configurações PIX</h2>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"><p className="text-green-800 text-sm"><strong>💡 Dica:</strong> Configure suas informações PIX para que os convidados possam fazer contribuições diretamente.</p></div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chave PIX</label>
                  <input type="text" name="pixKey" value={formData.pixKey} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Chave PIX (CPF, celular, email ou chave aleatória)"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2"><User className="inline h-4 w-4 mr-1" />Nome do Beneficiário</label>
                  <input type="text" name="pixName" value={formData.pixName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Nome completo do titular da conta"/>
                </div>
              </div>
            )}
            {activeSection === 'sobre' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6"><FileText className="h-6 w-6 text-purple-500" /><h2 className="text-2xl font-bold text-gray-800">Sobre Vocês</h2></div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">História do Casal</label>
                  <textarea name="aboutText" value={formData.aboutText} onChange={handleChange} rows={6} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Conte um pouco da história de vocês, como se conheceram, planos para o futuro..."></textarea>
                  <p className="text-sm text-gray-500 mt-2">Este texto aparecerá na seção "Nossa História" do site público.</p>
                </div>
              </div>
            )}
            {activeSection === 'visual' && (
              <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6"><Image className="h-6 w-6 text-blue-500" /><h2 className="text-2xl font-bold text-gray-800">Aparência do Site</h2></div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Imagem de Fundo Principal</label>
                      <input type="url" name="heroImage" value={formData.heroImage} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="https://example.com/sua-foto.jpg"/>
                      <p className="text-sm text-gray-500 mt-2">URL da imagem que aparecerá como fundo do site. Recomendamos uma foto romântica do casal (1920x1080px ou maior).</p>
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <h4 className="font-medium text-blue-800 mb-2">💡 Dicas para a foto perfeita:</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                              <li>• Use fotos em alta resolução (mínimo 1920x1080px)</li>
                              <li>• Prefira imagens com boa iluminação</li>
                              <li>• Evite fotos muito escuras ou com muito contraste</li>
                              <li>• Teste como fica com o texto sobreposto</li>
                          </ul>
                      </div>
                  </div>
                  {formData.heroImage && (
                      <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                          <div className="relative h-64 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                            {imageError ? (
                                <div className="absolute inset-0 bg-red-50 border-2 border-dashed border-red-300 flex items-center justify-center">
                                <p className="text-red-600 text-sm">❌ Erro ao carregar imagem. Verifique a URL.</p>
                                </div>
                            ) : (
                                <>
                                <img src={formData.heroImage} alt="Preview" className="w-full h-full object-cover" onError={() => setImageError(true)}/>
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <div className="text-center text-white p-4">
                                    <h3 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">{formData.brideNames}</h3>
                                    <p className="text-xl md:text-2xl font-light opacity-90">Chá de Panela</p>
                                    <div className="mt-4 text-sm opacity-75">Preview: Como aparecerá no site</div>
                                    </div>
                                </div>
                                </>
                            )}
                          </div>
                      </div>
                  )}
              </div>
            )}

            <div className="flex justify-end pt-8 border-t border-gray-200 mt-8">
              <button type="submit" disabled={isSaving}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSaving ? (<div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>) : (<Save className="h-4 w-4" />)}
                <span>{feedbackMessage}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsManager;