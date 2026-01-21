import { useState, useRef, useEffect } from 'react';
import { TbCannabisFilled } from "react-icons/tb";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import './App.css';

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [showTyping, setShowTyping] = useState(false);
  const [pedidoActual, setPedidoActual] = useState({
    producto: '',
    cantidad: 0,
    zona: '',
    precio: 0
  });
  const [cannabisPhrase, setCannabisPhrase] = useState('');
  const [showPhrase, setShowPhrase] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);
  const carouselRef = useRef(null);

  const phrases = [
    "¿Armamos uno?",
    "Hora de enrolar",
    "Haciendo un paisano",
    "Dale, enrolá",
    "¿Un toque?",
    "Preparando el verde",
    "¿Fumamos?",
    "Ndeee",
    "Tenes un tuco?"
  ];

  useEffect(() => {
    if (!chatOpen) {
      const showPhraseInterval = setInterval(() => {
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        setCannabisPhrase(randomPhrase);
        setShowPhrase(true);
        
        setTimeout(() => {
          setShowPhrase(false);
        }, 3000);
      }, 8000);

      const showSmokeInterval = setInterval(() => {
        setShowSmoke(true);
        setTimeout(() => {
          setShowSmoke(false);
        }, 2000);
      }, 3500);

      return () => {
        clearInterval(showPhraseInterval);
        clearInterval(showSmokeInterval);
      };
    }
  }, [chatOpen]);

  const productos = [
    {
      badge: 'Estándar',
      nombre: 'Comercial',
      rating: 'CALIDAD DIARIA',
      precio: '₲ 8.000',
      precioUnit: 8000,
      detalles: 'Por gramo. Calidad estándar perfecta para uso diario.',
      descripcion: 'Calidad estándar perfecta para uso diario. Ideal para quien busca un buen producto a precio accesible.'
    },
    {
      badge: 'Premium',
      nombre: 'Gorilla Glue',
      rating: 'ALTA POTENCIA',
      precio: '₲ 15.000',
      precioUnit: 15000,
      detalles: 'Por gramo. Cepa premium con alta potencia y efectos intensos.',
      descripcion: 'Cepa premium con alta potencia. Conocida por sus efectos intensos y duraderos. Recomendada para usuarios experimentados.'
    },
    {
      badge: 'Superior',
      nombre: 'Blueberry',
      rating: 'SABOR EXCEPCIONAL',
      precio: '₲ 20.000',
      precioUnit: 20000,
      detalles: 'Por gramo. Calidad superior con sabor excepcional y aroma único.',
      descripcion: 'Calidad superior con sabor excepcional a frutas del bosque. Aroma único y efectos balanceados.'
    },
    {
      badge: 'Especial',
      nombre: 'Yensis',
      rating: 'LA VIEJA CONFIABLE',
      precio: '₲ 30.000',
      precioUnit: 3000,
      detalles: 'Pack de 10 gramos. Producto nacional de confianza y calidad garantizada.',
      descripcion: 'La vieja confiable. Producto nacional de calidad garantizada. Pack especial de 10 gramos.'
    }
  ];

  const openChat = () => {
    setChatOpen(true);
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      addBotMessage('Hola! Bienvenido a Yupi 👋', false);
      setTimeout(() => {
        addBotMessage('Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?', true, [
          { text: '🛒 Ver productos disponibles', action: 'verProductos' },
          { text: '📦 Hacer un pedido', action: 'hacerPedido' },
          { text: '❓ Información sobre entregas', action: 'infoEntrega' },
          { text: '💳 Métodos de pago', action: 'infoPago' }
        ]);
      }, 800);
    }, 1500);
  };

  const closeChat = () => {
    setChatOpen(false);
    setMessages([]);
    setPedidoActual({ producto: '', cantidad: 0, zona: '', precio: 0 });
  };

  const addBotMessage = (text, withOptions = false, options = []) => {
    const newMessage = {
      type: 'bot',
      text,
      time: new Date().toLocaleTimeString('es-PY', { hour: '2-digit', minute: '2-digit' }),
      options: withOptions ? options : []
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text) => {
    const newMessage = {
      type: 'user',
      text,
      time: new Date().toLocaleTimeString('es-PY', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleOption = (action) => {
    const [mainAction, param] = action.split(':');

    switch (mainAction) {
      case 'verProductos':
        addUserMessage('Ver productos disponibles');
        setShowTyping(true);
        setTimeout(() => {
          setShowTyping(false);
          addBotMessage('Estos son nuestros productos disponibles:', true, [
            { text: '🍊 Comercial - ₲8.000/g', action: 'seleccionarProducto:Comercial' },
            { text: '🫐 Gorilla Glue - ₲15.000/g', action: 'seleccionarProducto:Gorilla Glue' },
            { text: '🍇 Blueberry - ₲20.000/g', action: 'seleccionarProducto:Blueberry' },
            { text: '🇵🇾 Yensis - ₲30.000/10g', action: 'seleccionarProducto:Yensis' }
          ]);
        }, 1000);
        break;

      case 'hacerPedido':
        addUserMessage('Quiero hacer un pedido');
        setShowTyping(true);
        setTimeout(() => {
          setShowTyping(false);
          addBotMessage('Perfecto! ¿Qué producto te gustaría ordenar?', true, [
            { text: '🍊 Comercial', action: 'seleccionarProducto:Comercial' },
            { text: '🫐 Gorilla Glue', action: 'seleccionarProducto:Gorilla Glue' },
            { text: '🍇 Blueberry', action: 'seleccionarProducto:Blueberry' },
            { text: '🇵🇾 Yensis', action: 'seleccionarProducto:Yensis' }
          ]);
        }, 1000);
        break;

      case 'infoEntrega':
        addUserMessage('Información sobre entregas');
        setShowTyping(true);
        setTimeout(() => {
          setShowTyping(false);
          addBotMessage('Realizamos entregas en toda Asunción y alrededores. Tiempo estimado: 1-2 horas según tu zona. Todas las entregas son discretas y seguras.', true, [
            { text: '📦 Hacer un pedido', action: 'hacerPedido' },
            { text: '🏠 Volver al inicio', action: 'inicio' }
          ]);
        }, 1000);
        break;

      case 'infoPago':
        addUserMessage('Métodos de pago');
        setShowTyping(true);
        setTimeout(() => {
          setShowTyping(false);
          addBotMessage('Aceptamos: Efectivo, Transferencia bancaria y Giros Tigo. El pago se realiza al momento de la entrega.', true, [
            { text: '📦 Hacer un pedido', action: 'hacerPedido' },
            { text: '🏠 Volver al inicio', action: 'inicio' }
          ]);
        }, 1000);
        break;

      case 'seleccionarProducto':
        addUserMessage('Pedido de ' + param);
        setPedidoActual(prev => ({ ...prev, producto: param }));
        
        const producto = productos.find(p => p.nombre === param);
        const precioTexto = param === 'Yensis' ? '₲30.000 por 10 gramos' : `₲${(producto.precioUnit / 1000).toFixed(1).replace('.', ',')}00 por gramo`;
        
        setShowTyping(true);
        setTimeout(() => {
          setShowTyping(false);
          addBotMessage(`Has seleccionado ${param}. Precio: ${precioTexto}. ¿Cuántos gramos deseas?`, true, [
            { text: '1 gramo', action: 'cantidad:1' },
            { text: '3 gramos', action: 'cantidad:3' },
            { text: '5 gramos', action: 'cantidad:5' },
            { text: '10 gramos', action: 'cantidad:10' }
          ]);
        }, 1000);
        break;

      case 'cantidad':
        const cantidad = parseInt(param);
        setPedidoActual(prev => ({ ...prev, cantidad }));
        addUserMessage(cantidad + ' gramo' + (cantidad > 1 ? 's' : ''));
        
        setShowTyping(true);
        setTimeout(() => {
          setShowTyping(false);
          addBotMessage('Perfecto! ¿En qué zona de Asunción te encuentras?', true, [
            { text: '📍 Centro', action: 'zona:Centro' },
            { text: '📍 Villa Morra', action: 'zona:Villa Morra' },
            { text: '📍 San Lorenzo', action: 'zona:San Lorenzo' },
            { text: '📍 Lambaré', action: 'zona:Lambaré' }
          ]);
        }, 1000);
        break;

      case 'zona':
        setPedidoActual(prev => ({ ...prev, zona: param }));
        addUserMessage('Zona: ' + param);
        
        setTimeout(() => {
          const prod = productos.find(p => p.nombre === pedidoActual.producto);
          const total = prod.precioUnit * pedidoActual.cantidad;
          
          setShowTyping(true);
          setTimeout(() => {
            setShowTyping(false);
            addBotMessage(`Resumen de tu pedido:\n\n📦 Producto: ${pedidoActual.producto}\n📊 Cantidad: ${pedidoActual.cantidad}g\n📍 Zona: ${param}\n💰 Total: ₲${total.toLocaleString()}\n\n¿Confirmas tu pedido?`, true, [
              { text: '✅ Confirmar pedido', action: 'confirmarPedido' },
              { text: '❌ Cancelar', action: 'cancelarPedido' }
            ]);
          }, 1000);
        }, 100);
        break;

      case 'confirmarPedido':
        addUserMessage('Confirmar pedido');
        setShowTyping(true);
        setTimeout(() => {
          setShowTyping(false);
          addBotMessage('🎉 ¡Pedido confirmado!\n\nTu pedido ha sido registrado exitosamente. Recibirás tu entrega en 1-2 horas.\n\nGracias por confiar en Yupi!', true, [
            { text: '🏠 Volver al inicio', action: 'inicio' },
            { text: '📦 Hacer otro pedido', action: 'hacerPedido' }
          ]);
          setPedidoActual({ producto: '', cantidad: 0, zona: '', precio: 0 });
        }, 1200);
        break;

      case 'cancelarPedido':
        addUserMessage('Cancelar pedido');
        setShowTyping(true);
        setTimeout(() => {
          setShowTyping(false);
          addBotMessage('Pedido cancelado. ¿Hay algo más en lo que pueda ayudarte?', true, [
            { text: '📦 Hacer un pedido', action: 'hacerPedido' },
            { text: '🛒 Ver productos', action: 'verProductos' },
            { text: '🏠 Volver al inicio', action: 'inicio' }
          ]);
          setPedidoActual({ producto: '', cantidad: 0, zona: '', precio: 0 });
        }, 1000);
        break;

      case 'inicio':
        addUserMessage('Volver al inicio');
        setShowTyping(true);
        setTimeout(() => {
          setShowTyping(false);
          addBotMessage('¿En qué puedo ayudarte?', true, [
            { text: '🛒 Ver productos disponibles', action: 'verProductos' },
            { text: '📦 Hacer un pedido', action: 'hacerPedido' },
            { text: '❓ Información sobre entregas', action: 'infoEntrega' },
            { text: '💳 Métodos de pago', action: 'infoPago' }
          ]);
        }, 1000);
        break;
    }
  };

  const contactar = (producto) => {
    openChat();
    setTimeout(() => {
      setShowTyping(true);
      setTimeout(() => {
        setShowTyping(false);
        addBotMessage(`Excelente elección! Has seleccionado ${producto}.`, true, [
          { text: '✅ Hacer pedido de ' + producto, action: 'seleccionarProducto:' + producto },
          { text: '🔙 Ver otros productos', action: 'verProductos' }
        ]);
      }, 1200);
    }, 1000);
  };

  const sendMessage = () => {
    if (chatInput.trim() === '') return;
    
    addUserMessage(chatInput);
    setChatInput('');
    
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      addBotMessage('Gracias por tu mensaje. Para una mejor experiencia, te recomiendo usar las opciones del menú. ¿En qué puedo ayudarte?', true, [
        { text: '🛒 Ver productos', action: 'verProductos' },
        { text: '📦 Hacer pedido', action: 'hacerPedido' },
        { text: '❓ Info entregas', action: 'infoEntrega' }
      ]);
    }, 1000);
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 390; // ancho de tarjeta + gap
      const newScrollPosition = direction === 'left' 
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="app">
      <div className="bg-animation">
        <TbCannabisFilled className="cannabis-icon icon-1" />
        <TbCannabisFilled className="cannabis-icon icon-2" />
        <TbCannabisFilled className="cannabis-icon icon-3" />
        <TbCannabisFilled className="cannabis-icon icon-4" />
        <TbCannabisFilled className="cannabis-icon icon-5" />
        <TbCannabisFilled className="cannabis-icon icon-6" />
        <TbCannabisFilled className="cannabis-icon icon-7" />
        <TbCannabisFilled className="cannabis-icon icon-8" />
      </div>
      
      <header>
        <div className="logo">
          <h1>YUPI</h1>
        </div>
        <p className="subtitle">CANNABIS PARAGUAY</p>
      </header>
      
      <div className="container">        
        <div className="carousel-wrapper">
          <button className="carousel-btn carousel-btn-left" onClick={() => scrollCarousel('left')}>
            <IoChevronBack />
          </button>
          
          <div className="products" ref={carouselRef}>
            {productos.map((producto, index) => (
              <div key={index} className="product-card">
                <span className="product-badge">
                  <TbCannabisFilled className="badge-icon" />
                  {producto.badge}
                </span>
                <h3 className="product-name">{producto.nombre}</h3>
                <div className="product-rating">{producto.rating}</div>
                <div className="product-price">{producto.precio}</div>
                <p className="product-details">{producto.detalles}</p>
                <button className="btn-contact" onClick={() => contactar(producto.nombre)}>
                  Consultar
                </button>
              </div>
            ))}
          </div>
          
          <button className="carousel-btn carousel-btn-right" onClick={() => scrollCarousel('right')}>
            <IoChevronForward />
          </button>
        </div>
        
      
      </div>
      
      {!chatOpen && (
        <>
          {showPhrase && (
            <div className="cannabis-phrase">
              {cannabisPhrase}
            </div>
          )}
          <button className="floating-chat-btn" onClick={openChat}>
            <div className="cannabis-with-eyes">
              <TbCannabisFilled className="cannabis-base" />
              <div className="face">
                <div className="eyes">
                  <div className="pupil pupil-left"></div>
                  <div className="pupil pupil-right"></div>
                </div>
                <div className="nose"></div>
              </div>
              {showSmoke && (
                <div className="smoke-container">
                  <div className="smoke smoke-1"></div>
                  <div className="smoke smoke-2"></div>
                  <div className="smoke smoke-3"></div>
                </div>
              )}
            </div>
          </button>
        </>
      )}
      
      {/* Widget del chat */}
      {chatOpen && (
        <div className="chat-widget">
          <div className="chat-header">
            <div className="chat-status">
              <span className="status-dot"></span>
              <span>Bot de Yupi en línea</span>
            </div>
            <button className="btn-close-chat" onClick={closeChat}>
              ✕
            </button>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                <div className="message-content">
                  <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>
                  <div className="message-time">{msg.time}</div>
                </div>
                {msg.options && msg.options.length > 0 && (
                  <div className="chat-options">
                    {msg.options.map((opt, i) => (
                      <button 
                        key={i} 
                        className="option-btn" 
                        onClick={() => handleOption(opt.action)}
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {showTyping && (
              <div className="typing-indicator active">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
          
          <div className="chat-input-container">
            <input 
              type="text" 
              className="chat-input" 
              placeholder="Escribe tu mensaje..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="chat-send-btn" onClick={sendMessage}>
              Enviar
            </button>
          </div>
        </div>
      )}
      
      <footer>
        <p>YUPI - CANNABIS PARAGUAY 2026</p>
        <p style={{ marginTop: '15px' }}>Venta legal según normativa vigente | Solo mayores de edad</p>
      </footer>
    </div>
  );
}

export default App;