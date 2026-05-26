import imgCoxinha from './assets/coxinha.png';
import imgBolinha from './assets/bolinha.png';
import imgEnroladinho from './assets/enroladinho.png';
import imgPastel from './assets/pastel.png';
import imgPizza from './assets/pizza.png';

export const menuData = [
  // Mini Frituras
  {
    id: 1,
    name: "Mini Coxinha de Frango",
    description: "Unidade de mini coxinha.",
    price: 1.00,
    category: "Mini Frituras",
    image: imgCoxinha, 
  },
  {
    id: 2,
    name: "Mini Bolinha de Queijo",
    description: "Unidade de mini bolinha de queijo.",
    price: 1.00,
    category: "Mini Frituras",
    image: imgBolinha, 
  },
  {
    id: 3,
    name: "Mini Bolinha Mista",
    description: "Unidade de mini bolinha mista.",
    price: 1.00,
    category: "Mini Frituras",
    image: imgBolinha, 
  },
  {
    id: 4,
    name: "Mini Enroladinho de Salsicha",
    description: "Unidade de mini enroladinho.",
    price: 1.00,
    category: "Mini Frituras",
    image: imgEnroladinho, 
  },

  // Pastéis
  {
    id: 5,
    name: "Pastel",
    description: "Pastel frito na hora. Escolha o sabor.",
    price: 10.00,
    category: "Pastéis",
    flavors: ["Frango", "Queijo", "Frango c/ Queijo", "Queijo e Calabresa", "Misto"],
    image: imgPastel, 
  },

  // Pizzas
  {
    id: 6,
    name: "Pizza",
    description: "Pizza deliciosa tamanho padrão. (Atenção: Apenas Retirada, não fazemos entrega de pizzas)",
    price: 40.00,
    category: "Pizzas",
    flavors: ["Queijo", "Mista", "Frango", "Calabresa", "Portuguesa"],
    deliveryDisabled: true,
    image: imgPizza, 
  }
];

export const CATEGORIES = ["Todos", "Mini Frituras", "Pastéis", "Pizzas"];
