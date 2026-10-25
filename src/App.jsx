import React, { useState, useEffect } from 'react';
import { Utensils, Shield, Search, ArrowRight, Plus, Edit2, Trash2, Save, X, Sparkles } from 'lucide-react';

const INITIAL_MENU = [
  // --- ENTRANTES ---
  { id: 1, name: 'Bolitas de Queso', price: 800, category: 'Entrantes', description: 'Porción de bolitas de queso frito.', isOffer: false },
  { id: 2, name: 'Fajitas de Cerdo', price: 2000, category: 'Entrantes', description: 'Jugosas fajitas salteadas.', isOffer: false },
  { id: 3, name: 'Fajitas de Cerdo Aceitunadas', price: 2650, category: 'Entrantes', description: 'Salteadas con aceitunas.', isOffer: false },
  { id: 4, name: 'Fajitas de Pollo', price: 2000, category: 'Entrantes', description: 'Tiras de pollo a la plancha.', isOffer: false },
  { id: 5, name: 'Fajitas de Pollo Aceitunadas', price: 2650, category: 'Entrantes', description: 'Pollo salteado con aceitunas.', isOffer: false },
  { id: 6, name: 'Esperlan de Pescado', price: 2000, category: 'Entrantes', description: 'Tiritas de pescado empanizadas.', isOffer: false },
  { id: 7, name: 'Minuta Frita', price: 2000, category: 'Entrantes', description: 'Pescado frito estilizado.', isOffer: false },
  { id: 8, name: 'Entremés de Jamón y Queso', price: 1300, category: 'Entrantes', description: 'Lajas de jamón y queso fresco.', isOffer: false },
  { id: 9, name: 'Entremés Mixto', price: 1700, category: 'Entrantes', description: 'Jamón, queso y aceitunas.', isOffer: false },
  { id: 10, name: 'Croquetas', price: 1000, category: 'Entrantes', description: 'Croquetas de la casa.', isOffer: false },
  { id: 11, name: 'Tostones Rellenos (Jamón y Queso)', price: 1500, category: 'Entrantes', description: 'Con jamón, queso y salsa rosa.', isOffer: true },
  { id: 12, name: 'Tostones Rellenos con Atún', price: 1700, category: 'Entrantes', description: 'Rellenos de atún preparado.', isOffer: false },
  { id: 13, name: 'Tostones Rellenos con Ropa Vieja', price: 1700, category: 'Entrantes', description: 'Rellenos de carne desmenuzada.', isOffer: false },
  { id: 14, name: 'Frituras de Malanga', price: 1000, category: 'Entrantes', description: 'Crujientes y doraditas.', isOffer: false },
  { id: 15, name: 'Cóctel de Langosta', price: 1700, category: 'Entrantes', description: 'Fresco y sazonado.', isOffer: false },
  { id: 16, name: 'Cóctel de Camarones', price: 1800, category: 'Entrantes', description: 'Con salsa especial.', isOffer: false },
  { id: 17, name: 'Papas Fritas', price: 1000, category: 'Entrantes', description: 'Porción clásica.', isOffer: false },
  { id: 18, name: 'Papas Fritas con Salchichas', price: 1300, category: 'Entrantes', description: 'Combinadas con salchicha.', isOffer: false },
  { id: 19, name: 'Aceitunas', price: 1000, category: 'Entrantes', description: 'Ración de aceitunas.', isOffer: false },
  { id: 20, name: 'Periquito', price: 1500, category: 'Entrantes', description: 'Especial de la casa.', isOffer: false },
  { id: 21, name: 'Fajita de Langosta', price: 2000, category: 'Entrantes', description: 'Tiras de langosta salteadas.', isOffer: false },
  { id: 22, name: 'Bolitas de Jamón y Queso', price: 1200, category: 'Entrantes', description: 'Crujientes y empanizadas.', isOffer: false },

  // --- CREMAS ---
  { id: 23, name: 'Crema de Queso', price: 1000, category: 'Cremas', description: 'Suave crema de queso gratinada.', isOffer: false },
  { id: 24, name: 'Crema de Jamón y Queso', price: 1200, category: 'Cremas', description: 'Combinación cremosa tradicional.', isOffer: false },
  { id: 25, name: 'Crema Aurora', price: 1000, category: 'Cremas', description: 'Crema a base de tomate y queso.', isOffer: false },

  // --- PASTAS ---
  { id: 26, name: 'Espagueti Napolitano', price: 800, category: 'Pastas', description: 'Salsa de tomate napolitana con queso.', isOffer: false },
  { id: 27, name: 'Espagueti de Jamón y Queso', price: 1000, category: 'Pastas', description: 'Con jamón picadito y abundante queso.', isOffer: false },

  // --- SUGERENCIAS DEL CHEF ---
  { id: 28, name: 'Garbanzo Frito', price: 1500, category: 'Sugerencias', description: 'Especialidad guisada de la casa.', isOffer: true },
  { id: 29, name: 'Langosta al Ajillo (Sugerencia)', price: 2200, category: 'Sugerencias', description: 'Sartenada de langosta salteada.', isOffer: true },
  { id: 30, name: 'Fajita de Langosta (Sugerencia)', price: 2000, category: 'Sugerencias', description: 'Sugerencia especial.', isOffer: false },
  { id: 31, name: 'Mar y Tierra', price: 6000, category: 'Sugerencias', description: 'Plato fuerte estelar con carnes y mariscos.', isOffer: true },
  { id: 32, name: 'Filete de Pescado Gratinado', price: 2200, category: 'Sugerencias', description: 'Cubierto con queso fundido.', isOffer: false },
  { id: 33, name: 'Jhon Bill', price: 4200, category: 'Sugerencias', description: 'Pescado, camarón, bechamel y queso.', isOffer: true },
  { id: 34, name: 'Bistec de Cerdo Gratinado', price: 2900, category: 'Sugerencias', description: 'Bistec con abundante queso encima.', isOffer: false },
  { id: 35, name: 'Bistec de Pollo Gratinado', price: 2700, category: 'Sugerencias', description: 'Pechuga gratinada al horno.', isOffer: false },
  { id: 36, name: 'Picadera Las Palmitas', price: 6000, category: 'Sugerencias', description: 'Masa de cerdo, aceitunas, queso, jamón, fajitas de pollo, croquetas y tostones rellenos.', isOffer: true },
  { id: 37, name: 'Chilindrón de Cordero', price: 3000, category: 'Sugerencias', description: 'Cordero en salsa criolla especial.', isOffer: false },
  { id: 38, name: 'Chicharronetas Mexicanas', price: 2500, category: 'Sugerencias', description: 'Chicharrones crujientes sazonados.', isOffer: false },
  { id: 39, name: 'Paella', price: 3000, category: 'Sugerencias', description: 'Arroz con mariscos y carnes estilo español.', isOffer: true },

  // --- CERDO ---
  { id: 40, name: 'Bistec Uruguayo', price: 3100, category: 'Cerdo', description: 'Relleno de jamón y queso, empanizado.', isOffer: false },
  { id: 41, name: 'Rollo de Cerdo', price: 3100, category: 'Cerdo', description: 'Enrollado relleno especial.', isOffer: false },
  { id: 42, name: 'Bistec Grillé', price: 2400, category: 'Cerdo', description: 'A la plancha bien sazonado.', isOffer: false },
  { id: 43, name: 'Masa Frita', price: 2300, category: 'Cerdo', description: 'Trozos de cerdo crujientes por fuera.', isOffer: false },
  { id: 44, name: 'Masa Asada en Cazuela', price: 2300, category: 'Cerdo', description: 'Jugosa cocida en su propio jugo.', isOffer: false },
  { id: 45, name: 'Fricasé de Cerdo', price: 2400, category: 'Cerdo', description: 'En salsa roja con especias.', isOffer: false },
  { id: 46, name: 'Cerdo a la Juliana', price: 1900, category: 'Cerdo', description: 'Tiras finas salteadas.', isOffer: false },
  { id: 47, name: 'Chuleta de Cerdo', price: 2400, category: 'Cerdo', description: 'A la parrilla o plancha.', isOffer: false },
  { id: 48, name: 'Costilla Frita', price: 3000, category: 'Cerdo', description: 'Costillas doradas al sartén.', isOffer: false },
  { id: 49, name: 'Bistec de Cerdo Empanado', price: 2300, category: 'Cerdo', description: 'Crujiente empanizado.', isOffer: false },

  // --- RES ---
  { id: 50, name: 'Ropa Vieja (Res)', price: 2700, category: 'Res', description: 'Carne desmenuzada en salsa criolla.', isOffer: false },
  { id: 51, name: 'Vaca Frita', price: 2700, category: 'Res', description: 'Carne frita salteada con cebolla.', isOffer: false },

  // --- POLLO ---
  { id: 52, name: 'Pollo Golden Blue', price: 2700, category: 'Pollo', description: 'Pechuga rellena empanizada.', isOffer: true },
  { id: 53, name: 'Pollo Frito', price: 1800, category: 'Pollo', description: 'Piezas de pollo crujientes.', isOffer: false },
  { id: 54, name: 'Pollo Chiflado', price: 2000, category: 'Pollo', description: 'Especialidad salteada con salsas.', isOffer: false },
  { id: 55, name: 'Pollo Asado en Cazuela', price: 1800, category: 'Pollo', description: 'Jugoso horneado en cazuela.', isOffer: false },
  { id: 56, name: 'Pollo Fricasé', price: 1900, category: 'Pollo', description: 'En salsa sabrosa criolla.', isOffer: false },
  { id: 57, name: 'Pollo a la Juliana', price: 1700, category: 'Pollo', description: 'Tiras de pollo salteadas.', isOffer: false },
  { id: 58, name: 'Bistec de Pollo Empanizado', price: 2000, category: 'Pollo', description: 'Pechuga empanizada frita.', isOffer: false },
  { id: 59, name: 'Pechuga Grillé', price: 2000, category: 'Pollo', description: 'Pechuga de pollo a la plancha.', isOffer: false },

  // --- DEL MAR ---
  { id: 60, name: 'Langosta Mariposa', price: 2800, category: 'Del Mar', description: 'Abierta al corte mariposa a la plancha.', isOffer: false },
  { id: 61, name: 'Enchilado de Langosta', price: 3000, category: 'Del Mar', description: 'Langosta guisada en salsa picante/criolla.', isOffer: false },
  { id: 62, name: 'Langosta Grillé', price: 2500, category: 'Del Mar', description: 'A la parrilla con sazón.', isOffer: false },
  { id: 63, name: 'Langosta Frita', price: 3000, category: 'Del Mar', description: 'Langosta dorada.', isOffer: false },
  { id: 64, name: 'Langosta Sensación', price: 3000, category: 'Del Mar', description: 'Preparación especial de la casa.', isOffer: true },
  { id: 65, name: 'Camarón Empanado', price: 2300, category: 'Del Mar', description: 'Camarones empanizados crujientes.', isOffer: false },
  { id: 66, name: 'Camarón al Ajillo', price: 2300, category: 'Del Mar', description: 'Camarones salteados con ajo y mantequilla.', isOffer: false },
  { id: 67, name: 'Camarón Enchilado', price: 3000, category: 'Del Mar', description: 'En abundante salsa roja criolla.', isOffer: false },
  { id: 68, name: 'Camarón Grillé', price: 2200, category: 'Del Mar', description: 'Camarones a la plancha.', isOffer: false },
  { id: 69, name: 'Pulpo al Ajillo', price: 2500, category: 'Del Mar', description: 'Trozos de pulpo con ajo y aceite.', isOffer: false },
  { id: 70, name: 'Pulpo Enchilado', price: 3000, category: 'Del Mar', description: 'Pulpo guisado en salsa.', isOffer: false },
  { id: 71, name: 'Filete de Sierra Empanada', price: 2000, category: 'Del Mar', description: 'Filete empanizado frito.', isOffer: false },
  { id: 72, name: 'Filete de Pescado Grillé', price: 1800, category: 'Del Mar', description: 'Pescado blanco a la plancha.', isOffer: false },
  { id: 73, name: 'Canciller', price: 2800, category: 'Del Mar', description: 'Pescado, jamón y queso empanizado.', isOffer: false },
  { id: 74, name: 'Calamar', price: 3000, category: 'Del Mar', description: 'Anillos de calamar fritos o al ajillo.', isOffer: false },
  { id: 75, name: 'Rueda de Sierra', price: 2000, category: 'Del Mar', description: 'Rueda frita o a la plancha.', isOffer: false },
  { id: 76, name: 'Seviche de Camarón', price: 2100, category: 'Del Mar', description: 'Camarón marinatado en limón.', isOffer: false },
  { id: 77, name: 'Filete Emperador', price: 2500, category: 'Del Mar', description: 'Corte fino de pescado blanco.', isOffer: false },
  { id: 78, name: 'Seviche Surtido', price: 2500, category: 'Del Mar', description: 'Mezcla fresca de mariscos al limón.', isOffer: false },

  // --- ARROZ ---
  { id: 79, name: 'Arroz Moro', price: 400, category: 'Arroz', description: 'Congrí tradicional cubano.', isOffer: false },
  { id: 80, name: 'Arroz Blanco', price: 300, category: 'Arroz', description: 'Graneado suave.', isOffer: false },
  { id: 81, name: 'Arroz Frito', price: 1000, category: 'Arroz', description: 'Estilo oriental con carnes picaditas.', isOffer: false },
  { id: 82, name: 'Arroz Pilaf', price: 400, category: 'Arroz', description: 'Sazonado con especias.', isOffer: false },

  // --- VIANDAS ---
  { id: 83, name: 'Yuca con Mojo', price: 400, category: 'Viendas', description: 'Yuca hervida con mojo agrio y ajo.', isOffer: false },
  { id: 84, name: 'Yuca con Chicharrón', price: 1000, category: 'Viendas', description: 'Yuca suave con chicharrones crujientes.', isOffer: false },
  { id: 85, name: 'Vianda Frita', price: 500, category: 'Viendas', description: 'Tostones o malanga frita.', isOffer: false },
  { id: 86, name: 'Ensalada', price: 500, category: 'Viendas', description: 'Vegetales frescos de estación.', isOffer: false },

  // --- POSTRES ---
  { id: 87, name: 'Flan', price: 500, category: 'Postres', description: 'Flan casero tradicional con caramelo.', isOffer: false },
  { id: 88, name: 'Helado', price: 600, category: 'Postres', description: 'Copa de helado de la casa.', isOffer: false },

  // --- SALSAS ---
  { id: 89, name: 'Salsa Rosa', price: 200, category: 'Salsas', description: 'Aderezo cremoso.', isOffer: false },
  { id: 90, name: 'Salsa de Langosta', price: 400, category: 'Salsas', description: 'Reducción sabrosa de langosta.', isOffer: false },
  { id: 91, name: 'Salsa Agridulce', price: 200, category: 'Salsas', description: 'Salsa agridulce especial.', isOffer: false },

  // --- COCTELERÍA ---
  { id: 92, name: 'Línea Crema', price: 400, category: 'Bebidas', description: 'Cóctel cremoso.', isOffer: false },
  { id: 93, name: 'Daiquirí', price: 500, category: 'Bebidas', description: 'Ron, limón, azúcar y hielo frapeado.', isOffer: false },
  { id: 94, name: 'Sangría', price: 500, category: 'Bebidas', description: 'Vino tinto con frutas y refresco.', isOffer: false },
  { id: 95, name: 'Copa Vino', price: 500, category: 'Bebidas', description: 'Copa de vino tinto o blanco.', isOffer: false },
  { id: 96, name: 'Margarita Blue', price: 650, category: 'Bebidas', description: 'Tequila con curaçao azul.', isOffer: false },
  { id: 97, name: 'Margarita Natural', price: 600, category: 'Bebidas', description: 'Clásica combinación de tequila y limón.', isOffer: false },
  { id: 98, name: 'Caipirosca', price: 600, category: 'Bebidas', description: 'Vodka con lima macerada.', isOffer: false },
  { id: 99, name: 'Michelada', price: 300, category: 'Bebidas', description: 'Cerveza con limón, sal y aderezos.', isOffer: false },
  { id: 100, name: 'Chelada', price: 250, category: 'Bebidas', description: 'Cerveza helada con limón y sal.', isOffer: false },
  { id: 101, name: 'Cuba Libre', price: 500, category: 'Bebidas', description: 'Ron con refresco de cola y limón.', isOffer: false },
  { id: 102, name: 'Cubanito', price: 800, category: 'Bebidas', description: 'Ron, salsa picante, jugo de tomate y limón.', isOffer: false },
  { id: 103, name: 'Línea de Vodka', price: 300, category: 'Bebidas', description: 'Trago de vodka.', isOffer: false },
  { id: 104, name: 'Vodka Screwdriver', price: 400, category: 'Bebidas', description: 'Vodka con jugo de naranja.', isOffer: false },
  { id: 105, name: 'Ron Cola', price: 500, category: 'Bebidas', description: 'Combinado clásico de ron y refresco.', isOffer: false },
  { id: 106, name: 'Cielo Azul', price: 700, category: 'Bebidas', description: 'Cóctel tropical azul.', isOffer: false },
  { id: 107, name: 'Sex on the Beach', price: 700, category: 'Bebidas', description: 'Vodka, licor de durazno y jugos.', isOffer: false },
  { id: 108, name: 'Piña Colada', price: 600, category: 'Bebidas', description: 'Ron, crema de coco y jugo de piña.', isOffer: false },
  { id: 109, name: 'Limonada Frappé', price: 300, category: 'Bebidas', description: 'Limonada refrescante frappé.', isOffer: false },

  // --- LÍNEAS DE WHISKY ---
  { id: 110, name: 'Whisky Bucanas', price: 2000, category: 'Bebidas', description: 'Trago de whisky Buchanan\'s.', isOffer: false },
  { id: 111, name: 'Whisky Red Label', price: 1000, category: 'Bebidas', description: 'Trago de Johnnie Walker Red Label.', isOffer: false },
  { id: 112, name: 'Whisky Jameson', price: 1000, category: 'Bebidas', description: 'Trago de whisky irlandés Jameson.', isOffer: false },
  { id: 113, name: 'Whisky Mcgregor', price: 700, category: 'Bebidas', description: 'Trago de whisky Clan MacGregor.', isOffer: false },

  // --- LÍNEAS DE RON ---
  { id: 114, name: 'Havana Club Especial', price: 400, category: 'Bebidas', description: 'Trago de ron añejo especial.', isOffer: false },
  { id: 115, name: 'Havana Club Reserva', price: 500, category: 'Bebidas', description: 'Trago de ron reserva.', isOffer: false },
  { id: 116, name: 'Havana Club 3 Años', price: 350, category: 'Bebidas', description: 'Trago de ron blanco 3 años.', isOffer: false },

  // --- CAFÉ ---
  { id: 117, name: 'Expreso (5oz)', price: 200, category: 'Café', description: 'Café expreso cargado cubano.', isOffer: false }
];

const CATEGORIES = ['Todos', 'Ofertas', 'Entrantes', 'Cremas', 'Pastas', 'Sugerencias', 'Cerdo', 'Res', 'Pollo', 'Del Mar', 'Arroz', 'Viendas', 'Postres', 'Salsas', 'Bebidas', 'Café'];

export default function App() {
  const [view, setView] = useState('welcome'); // 'welcome' | 'menu' | 'admin'
  const [menu, setMenu] = useState(() => {
    const saved = localStorage.getItem('palmitas_menu');
    return saved ? JSON.parse(saved) : INITIAL_MENU;
  });
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Admin states
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [adminSearch, setAdminSearch] = useState(''); // Buscador exclusivo para el admin
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', price: '', category: 'Entrantes', description: '', isOffer: false });

  useEffect(() => {
    localStorage.setItem('palmitas_menu', JSON.stringify(menu));
  }, [menu]);

  useEffect(() => {
    if (window.location.hash === '#admin') {
      setView('admin');
    }
  }, []);

  const filteredMenu = menu.filter(item => {
    const matchesCategory = selectedCategory === 'Todos' 
      ? true 
      : selectedCategory === 'Ofertas' 
      ? item.isOffer 
      : item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filtrado para el panel de administración
  const filteredAdminMenu = menu.filter(item => 
    item.name.toLowerCase().includes(adminSearch.toLowerCase()) || 
    item.category.toLowerCase().includes(adminSearch.toLowerCase())
  );

  const handleSaveItem = (e) => {
    e.preventDefault();
    if (editingItem) {
      setMenu(menu.map(i => i.id === editingItem.id ? { ...editingItem, price: Number(editingItem.price) } : i));
      setEditingItem(null);
    } else {
      const itemToAdd = { ...newItem, id: Date.now(), price: Number(newItem.price) };
      setMenu([itemToAdd, ...menu]);
      setNewItem({ name: '', price: '', category: 'Entrantes', description: '', isOffer: false });
    }
  };

  const handleDeleteItem = (id) => {
    if (confirm('¿Seguro que deseas eliminar este plato?')) {
      setMenu(menu.filter(i => i.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* 1. PANTALLA DE BIENVENIDA (QR) */}
      {view === 'welcome' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-900 via-slate-950 to-black">
          <div className="relative mb-6">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 to-amber-500 blur-md opacity-75 animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300" 
              alt="Las Palmitas Logo" 
              className="relative w-40 h-40 rounded-full object-cover border-4 border-amber-400 shadow-2xl mx-auto"
            />
          </div>
          <h1 className="text-3xl font-black text-amber-400 tracking-wider mb-2">LAS PALMITAS</h1>
          <p className="text-sm font-semibold text-emerald-400 tracking-widest uppercase mb-6">Güira de Melena</p>
          <p className="text-slate-300 max-w-xs mb-8 text-sm">Disfruta de nuestra auténtica cocina, coctelería y el mejor ambiente caribeño.</p>
          
          <button 
            onClick={() => setView('menu')}
            className="w-full max-w-xs bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg flex items-center justify-center gap-3 transition-all transform active:scale-95"
          >
            <span>Ver Menú y Ofertas</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button 
            onClick={() => { setView('admin'); window.location.hash = 'admin'; }}
            className="mt-6 text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1"
          >
            <Shield className="w-3.5 h-3.5" /> Panel de Administración
          </button>
        </div>
      )}

      {/* 2. MENÚ DEL CLIENTE */}
      {view === 'menu' && (
        <div className="flex-1 flex flex-col max-w-md mx-auto w-full bg-slate-900 min-h-screen shadow-2xl">
          <div className="sticky top-0 z-20 bg-slate-950/90 backdrop-blur border-b border-slate-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('welcome')}>
                <img 
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=80" 
                  alt="Logo" 
                  className="w-10 h-10 rounded-full border border-amber-400 object-cover"
                />
                <div>
                  <h2 className="font-bold text-amber-400 text-base leading-tight">Las Palmitas</h2>
                  <span className="text-xs text-emerald-400">Güira de Melena</span>
                </div>
              </div>
              <button 
                onClick={() => { setView('admin'); window.location.hash = 'admin'; }}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 transition-colors"
                title="Administración"
              >
                <Shield className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar plato, bebida u oferta..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pt-3 pb-1 no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat 
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' 
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat === 'Ofertas' ? '🔥 Ofertas' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 space-y-3 pb-20 flex-1">
            {filteredMenu.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <Utensils className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No se encontraron platos en esta categoría.</p>
              </div>
            ) : (
              filteredMenu.map((item) => (
                <div 
                  key={item.id} 
                  className={`relative bg-slate-950/60 border rounded-2xl p-4 transition-all ${
                    item.isOffer ? 'border-amber-500/50 bg-gradient-to-r from-amber-500/5 to-transparent' : 'border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {item.isOffer && (
                    <span className="absolute -top-2.5 right-3 bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow">
                      <Sparkles className="w-3 h-3" /> Oferta Especial
                    </span>
                  )}
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-100 text-sm mb-1">{item.name}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-2">{item.description}</p>
                      <span className="inline-block bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-400 font-bold text-base block">{item.price}</span>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">CUP</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="bg-slate-950 border-t border-slate-800 py-3 text-center text-xs text-slate-500">
            * A su cuenta se le suma el 5% de servicio. ¡Gracias por elegirnos!
          </div>
        </div>
      )}

      {/* 3. PANEL DE ADMINISTRACIÓN */}
      {view === 'admin' && (
        <div className="flex-1 flex flex-col max-w-md mx-auto w-full bg-slate-900 min-h-screen p-4">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-emerald-400" />
              <h2 className="font-bold text-lg text-white">Panel Admin</h2>
            </div>
            <button 
              onClick={() => { setView('menu'); window.location.hash = ''; }}
              className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl text-slate-300"
            >
              Ver Menú
            </button>
          </div>

          {!isAdminAuth ? (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 my-auto text-center">
              <h3 className="font-bold text-base mb-2 text-slate-200">Acceso Restringido</h3>
              <p className="text-xs text-slate-400 mb-4">Ingresa la contraseña sencilla (ej. <b>1234</b>) para modificar precios y ofertas.</p>
              <form onSubmit={(e) => {
                e.preventDefault();
                if (adminPass === '1234' || adminPass === 'admin') {
                  setIsAdminAuth(true);
                } else {
                  alert('Contraseña incorrecta. Prueba escribiendo: 1234');
                }
              }}>
                <input 
                  type="password" 
                  placeholder="Contraseña (1234)"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm mb-3 text-center text-white focus:outline-none focus:border-emerald-500"
                />
                <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                  Ingresar
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6 pb-12">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
                <h3 className="font-semibold text-sm text-amber-400 mb-3 flex items-center gap-2">
                  {editingItem ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {editingItem ? 'Editar Plato u Oferta' : 'Añadir Nuevo Plato u Oferta'}
                </h3>
                <form onSubmit={handleSaveItem} className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Nombre del plato"
                    value={editingItem ? editingItem.name : newItem.name}
                    onChange={(e) => editingItem ? setEditingItem({...editingItem, name: e.target.value}) : setNewItem({...newItem, name: e.target.value})}
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="number" 
                      placeholder="Precio (CUP)"
                      value={editingItem ? editingItem.price : newItem.price}
                      onChange={(e) => editingItem ? setEditingItem({...editingItem, price: e.target.value}) : setNewItem({...newItem, price: e.target.value})}
                      required
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                    <select
                      value={editingItem ? editingItem.category : newItem.category}
                      onChange={(e) => editingItem ? setEditingItem({...editingItem, category: e.target.value}) : setNewItem({...newItem, category: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    >
                      {CATEGORIES.filter(c => c !== 'Todos' && c !== 'Ofertas').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <textarea 
                    placeholder="Descripción breve..."
                    value={editingItem ? editingItem.description : newItem.description}
                    onChange={(e) => editingItem ? setEditingItem({...editingItem, description: e.target.value}) : setNewItem({...newItem, description: e.target.value})}
                    rows="2"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  ></textarea>
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                    <input 
                      type="checkbox" 
                      checked={editingItem ? editingItem.isOffer : newItem.isOffer}
                      onChange={(e) => editingItem ? setEditingItem({...editingItem, isOffer: e.target.checked}) : setNewItem({...newItem, isOffer: e.target.checked})}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                    />
                    Marcar como Oferta Especial ⭐
                  </label>
                  <div className="flex gap-2 pt-2">
                    <button type="submit" className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                      <Save className="w-4 h-4" /> {editingItem ? 'Actualizar' : 'Guardar Plato'}
                    </button>
                    {editingItem && (
                      <button type="button" onClick={() => setEditingItem(null)} className="px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* LISTADO DE INVENTARIO CON BUSCADOR PARA EL ADMIN */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-slate-300">Inventario ({filteredAdminMenu.length} de {menu.length})</h3>
                </div>
                
                {/* Buscador de Admin para no pasar trabajo buscando platos */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Filtrar platos para cambiar precio..." 
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  {filteredAdminMenu.map((item) => (
                    <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-white truncate flex items-center gap-1.5">
                          {item.name} {item.isOffer && <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">Oferta</span>}
                        </h4>
                        <p className="text-xs text-emerald-400 font-semibold">{item.price} CUP <span className="text-slate-500 font-normal">({item.category})</span></p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => { setEditingItem(item); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                          title="Editar precio u oferta"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg"
                          title="Eliminar plato"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
