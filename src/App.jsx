import React, { useState, useMemo, useEffect } from 'react';
import { menuData, CATEGORIES } from './data';
import { ShoppingBag, X, Plus, Minus, Store, Bike, MapPin, CreditCard, Banknote, MessageCircle } from 'lucide-react';
import './App.css';

function App() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [cart, setCart] = useState([]);
  
  // Modals
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Product Modal State
  const [qty, setQty] = useState(1);
  const [obs, setObs] = useState("");
  const [selectedFlavor, setSelectedFlavor] = useState("");

  // Checkout State
  const [deliveryMode, setDeliveryMode] = useState('pickup'); // 'pickup' or 'delivery'
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [changeFor, setChangeFor] = useState("");

  const filteredMenu = useMemo(() => {
    if (activeCategory === "Todos") return menuData;
    return menuData.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const deliveryFee = deliveryMode === 'delivery' ? 5.00 : 0;
  const grandTotal = cartSubtotal + deliveryFee;

  // Handlers
  const openProduct = (product) => {
    setSelectedProduct(product);
    setQty(1);
    setObs("");
    setSelectedFlavor(product.flavors ? product.flavors[0] : "");
  };

  const closeProduct = () => {
    setSelectedProduct(null);
  };

  const addToCart = () => {
    if (!selectedProduct) return;
    
    const newItem = {
      cartItemId: Date.now().toString(),
      product: selectedProduct,
      quantity: qty,
      observation: obs,
      flavor: selectedFlavor
    };
    
    setCart([...cart, newItem]);
    closeProduct();
  };

  const removeFromCart = (cartItemId) => {
    setCart(cart.filter(item => item.cartItemId !== cartItemId));
  };

  const formatCurrency = (val) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const sendOrder = () => {
    if (deliveryMode === 'delivery' && address.trim() === '') {
      alert("Por favor, informe o endereço de entrega em Eusébio.");
      return;
    }

    let text = `Olá, gostaria de fazer um pedido na *JK Lanches*:\n\n*Pedido:*\n`;
    
    cart.forEach(item => {
      text += `${item.quantity}x ${item.product.name} ${item.flavor ? `(Sabor: ${item.flavor})` : ''} - ${formatCurrency(item.product.price * item.quantity)}\n`;
      if (item.observation) {
        text += `   _Obs: ${item.observation}_\n`;
      }
    });

    text += `\n*Subtotal:* ${formatCurrency(cartSubtotal)}\n`;
    if (deliveryMode === 'delivery') {
      text += `*Taxa de Entrega:* ${formatCurrency(deliveryFee)}\n`;
    }
    text += `*Total:* ${formatCurrency(grandTotal)}\n\n`;

    text += `*Forma de Entrega:* ${deliveryMode === 'delivery' ? 'Entrega (Eusébio)' : 'Retirada no Local'}\n`;
    
    if (deliveryMode === 'delivery') {
      text += `*Endereço:* ${address}\n`;
    }
    
    const payMap = {
      'pix': 'PIX',
      'cash': 'Dinheiro',
      'card': 'Cartão'
    };
    
    text += `*Pagamento:* ${payMap[paymentMethod]}\n`;
    if (paymentMethod === 'cash' && changeFor) {
      text += `*Troco para:* R$ ${changeFor}\n`;
    }

    const encodedText = encodeURIComponent(text);
    const phoneNumber = "5585998425902";
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="header">
        <h1>JK Lanches</h1>
        <p>A melhor lanchonete da região</p>
      </header>

      {/* CATEGORIES */}
      <div className="categories-wrapper">
        <div className="categories">
          {CATEGORIES.map(cat => (
            <button 
              key={cat} 
              className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* MENU LIST */}
      <main className="menu-list">
        {filteredMenu.map(product => (
          <div key={product.id} className="product-card" onClick={() => openProduct(product)}>
            <div className="product-info">
              <div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.description}</p>
              </div>
              <span className="product-price">{formatCurrency(product.price)}</span>
            </div>
            <div className="product-img-wrapper">
              <img src={product.image} alt={product.name} className="product-img" loading="lazy" />
            </div>
          </div>
        ))}
      </main>

      {/* CART FLOAT BUTTON */}
      {cartTotalItems > 0 && !isCartOpen && (
        <div className="cart-float-wrapper">
          <button className="cart-float-btn" onClick={() => setIsCartOpen(true)}>
            <div className="icon">
              <ShoppingBag size={20} />
              <span className="cart-badge">{cartTotalItems}</span>
            </div>
            <span>Ver Sacola</span>
            <span>{formatCurrency(cartSubtotal)}</span>
          </button>
        </div>
      )}

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeProduct}><X size={20} /></button>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="modal-header-img" />
            
            <div className="modal-body">
              <h2 className="modal-title">{selectedProduct.name}</h2>
              <p className="modal-desc">{selectedProduct.description}</p>
              
              {selectedProduct.flavors && (
                <div style={{ marginBottom: 24 }}>
                  <h3 className="section-title">Escolha o Sabor</h3>
                  <div className="form-group">
                    <select 
                      value={selectedFlavor} 
                      onChange={(e) => setSelectedFlavor(e.target.value)}
                      style={{ padding: '12px', fontSize: '1rem', width: '100%', borderRadius: 'var(--radius-sm)' }}
                    >
                      {selectedProduct.flavors.map(f => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <h3 className="section-title">Alguma observação?</h3>
              <textarea 
                className="obs-input"
                placeholder="Ex: Tirar cebola, bem passado..."
                value={obs}
                onChange={(e) => setObs(e.target.value)}
              />
            </div>

            <div className="modal-footer glass">
              <div className="quantity-selector">
                <button className="qty-btn" disabled={qty <= 1} onClick={() => setQty(qty-1)}><Minus size={16} /></button>
                <span className="qty-text">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(qty+1)}><Plus size={16} /></button>
              </div>
              <button className="btn-primary" onClick={addToCart}>
                <span>Adicionar</span>
                <span>{formatCurrency(selectedProduct.price * qty)}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CART VIEW MODAL */}
      {isCartOpen && (
        <div className="modal-overlay" style={{ alignItems: 'flex-start' }}>
          <div className="modal-content" style={{ borderRadius: 0, height: '100vh', maxHeight: '100vh', display: 'flex' }}>
            <div className="cart-header glass">
              <button className="back-btn" onClick={() => setIsCartOpen(false)}><X size={24} /></button>
              <h2 className="modal-title" style={{ margin: 0, flex: 1 }}>Sua Sacola</h2>
            </div>
            
            <div className="modal-body" style={{ padding: 0 }}>
              {cart.length === 0 ? (
                <div style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <ShoppingBag size={48} style={{ opacity: 0.5, marginBottom: 16 }} />
                  <p>Sua sacola está vazia.</p>
                  <button className="btn-primary" style={{ marginTop: 24, justifyContent: 'center' }} onClick={() => setIsCartOpen(false)}>Ver Cardápio</button>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map(item => (
                      <div key={item.cartItemId} className="cart-item">
                        <div className="cart-item-qty">
                          <span style={{ fontWeight: 'bold' }}>{item.quantity}x</span>
                        </div>
                        <div className="cart-item-info" style={{ margin: '0 12px' }}>
                          <h4 className="cart-item-name">{item.product.name} {item.flavor && <span style={{fontSize:'0.85em', color:'var(--secondary-color)'}}>({item.flavor})</span>}</h4>
                          {item.observation && <p className="cart-item-obs">{item.observation}</p>}
                          <span className="cart-item-price">{formatCurrency(item.product.price * item.quantity)}</span>
                        </div>
                        <button style={{ color: 'var(--danger)' }} onClick={() => removeFromCart(item.cartItemId)}>
                          <X size={20} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="checkout-section">
                    <h3 className="section-title">Como deseja receber?</h3>
                    {cart.some(item => item.product.deliveryDisabled) && (
                      <div style={{ background: 'rgba(244, 67, 54, 0.1)', border: '1px solid var(--danger)', padding: 12, borderRadius: 8, marginBottom: 16 }}>
                        <p style={{ color: 'var(--danger)', fontSize: '0.85rem', margin: 0 }}>
                          O seu carrinho contém itens (Pizzas) que são exclusivos para retirada. A opção de entrega está desativada.
                        </p>
                      </div>
                    )}
                    <div className="delivery-options">
                      <button 
                        className={`delivery-opt-btn ${deliveryMode === 'pickup' || cart.some(item => item.product.deliveryDisabled) ? 'active' : ''}`}
                        onClick={() => setDeliveryMode('pickup')}
                      >
                        <Store size={24} />
                        <span>Retirada</span>
                      </button>
                      <button 
                        className={`delivery-opt-btn ${deliveryMode === 'delivery' && !cart.some(item => item.product.deliveryDisabled) ? 'active' : ''}`}
                        onClick={() => {
                          if (cart.some(item => item.product.deliveryDisabled)) {
                            alert("Não é possível solicitar entrega para este pedido pois contém itens exclusivos para retirada (Pizzas).");
                            return;
                          }
                          setDeliveryMode('delivery');
                        }}
                        style={{ opacity: cart.some(item => item.product.deliveryDisabled) ? 0.5 : 1 }}
                      >
                        <Bike size={24} />
                        <span>Entrega</span>
                      </button>
                    </div>

                    {(deliveryMode === 'delivery' && !cart.some(item => item.product.deliveryDisabled)) && (
                      <div className="form-group animation-fadeIn">
                        <label><MapPin size={16} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }}/> Endereço de Entrega (Apenas Eusébio)</label>
                        <input 
                          type="text" 
                          placeholder="Rua, Número, Bairro, Ponto de Referência"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        <p className="text-danger">* Taxa de entrega: R$ 5,00</p>
                      </div>
                    )}

                    <h3 className="section-title" style={{ marginTop: 24 }}>Forma de Pagamento</h3>
                    <div className="form-group">
                      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="pix">PIX</option>
                        <option value="card">Cartão (Crédito/Débito)</option>
                        <option value="cash">Dinheiro</option>
                      </select>
                    </div>

                    {paymentMethod === 'cash' && (
                      <div className="form-group animation-fadeIn">
                        <label>Troco para quanto?</label>
                        <input 
                          type="text" 
                          placeholder="Ex: 50,00 ou deixe em branco se não precisar"
                          value={changeFor}
                          onChange={(e) => setChangeFor(e.target.value)}
                        />
                      </div>
                    )}

                    <div className="totals">
                      <div className="total-row">
                        <span>Subtotal</span>
                        <span>{formatCurrency(cartSubtotal)}</span>
                      </div>
                      {deliveryMode === 'delivery' && (
                        <div className="total-row">
                          <span>Taxa de Entrega</span>
                          <span>{formatCurrency(deliveryFee)}</span>
                        </div>
                      )}
                      <div className="total-row grand-total">
                        <span>Total</span>
                        <span>{formatCurrency(grandTotal)}</span>
                      </div>
                    </div>
                    
                    <button className="whatsapp-btn" onClick={sendOrder}>
                      <MessageCircle size={24} />
                      Enviar Pedido por WhatsApp
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
