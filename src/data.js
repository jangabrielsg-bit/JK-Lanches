export const menuData = [
  // Mini Frituras
  {
    id: 1,
    name: "Mini Coxinha de Frango",
    description: "Unidade de mini coxinha.",
    price: 1.00,
    category: "Mini Frituras",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=500&auto=format&fit=crop", 
  },
  {
    id: 2,
    name: "Mini Bolinha de Queijo",
    description: "Unidade de mini bolinha de queijo.",
    price: 1.00,
    category: "Mini Frituras",
    image: "https://images.unsplash.com/photo-1595188448831-299f4931a756?q=80&w=500&auto=format&fit=crop", 
  },
  {
    id: 3,
    name: "Mini Bolinha Mista",
    description: "Unidade de mini bolinha mista.",
    price: 1.00,
    category: "Mini Frituras",
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=500&auto=format&fit=crop", 
  },
  {
    id: 4,
    name: "Mini Enroladinho de Salsicha",
    description: "Unidade de mini enroladinho.",
    price: 1.00,
    category: "Mini Frituras",
    image: "https://images.unsplash.com/photo-1563514258-b01133a52e1c?q=80&w=500&auto=format&fit=crop", 
  },

  // Pastéis
  {
    id: 5,
    name: "Pastel",
    description: "Pastel frito na hora. Escolha o sabor.",
    price: 10.00,
    category: "Pastéis",
    flavors: ["Frango", "Queijo", "Frango c/ Queijo", "Queijo e Calabresa", "Misto"],
    image: "https://images.unsplash.com/photo-1602881917445-0b1ba001addf?q=80&w=500&auto=format&fit=crop", 
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
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop", 
  }
];

export const CATEGORIES = ["Todos", "Mini Frituras", "Pastéis", "Pizzas"];
