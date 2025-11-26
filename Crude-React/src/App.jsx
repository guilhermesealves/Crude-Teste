import React, { useState, useEffect } from "react";
import { supabase } from "./CreateClient.js";
import "./App.css";

const App = () => {
  const [view, setView] = useState("menu");

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [modalCatOpen, setModalCatOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState({ id: null, name: "" });
  const [deleteCatOpen, setDeleteCatOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category_id: ""
  });
  const [modalProdOpen, setModalProdOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState({
    id: null,
    name: "",
    price: "",
    category_id: ""
  });
  const [deleteProdOpen, setDeleteProdOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Novo: Modal de alerta para campos obrigatórios
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (view === "categories") fetchCategories();
    if (view === "products") {
      fetchCategories();
      fetchProducts();
    }
  }, [view]);

  // ======== FETCH ========
  async function fetchCategories() {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("id", { ascending: true });
    if (!error) setCategories(data);
  }

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });
    if (!error) setProducts(data);
  }

  // ======== CATEGORY HANDLERS ========
  async function handleAddCategory(e) {
    e.preventDefault();
    if (!newCategory) {
      setAlertMessage("O nome da categoria é obrigatório!");
      setAlertOpen(true);
      return;
    }
    const { data, error } = await supabase
      .from("clients")
      .insert([{ name: newCategory }])
      .select();
    if (!error && data) {
      setCategories(prev => [...prev, data[0]]);
      setNewCategory("");
    }
  }

  function openCategoryModal(category) {
    setModalCategory({ ...category });
    setModalCatOpen(true);
  }

  async function handleSaveCategory() {
    if (!modalCategory.name) return;
    const { data, error } = await supabase
      .from("clients")
      .update({ name: modalCategory.name })
      .eq("id", modalCategory.id)
      .select();
    if (!error && data) {
      setCategories(prev =>
        prev.map(c => (c.id === modalCategory.id ? data[0] : c))
      );
      setModalCatOpen(false);
    }
  }

  function openDeleteCategory(category) {
    setCategoryToDelete(category);
    setDeleteCatOpen(true);
  }

  async function handleDeleteCategory() {
    const { error } = await supabase
      .from("clients")
      .delete()
      .eq("id", categoryToDelete.id);
    if (!error) {
      setCategories(prev => prev.filter(c => c.id !== categoryToDelete.id));
      setDeleteCatOpen(false);
      setCategoryToDelete(null);
    }
  }

  // ======== PRODUCT HANDLERS ========
  async function handleAddProduct(e) {
    e.preventDefault();

    // Validação com modal
    if (!newProduct.name || !newProduct.price || !newProduct.category_id) {
      setAlertMessage("Por favor, preencha todos os campos do produto!");
      setAlertOpen(true);
      return;
    }

    const { data, error } = await supabase
      .from("products")
      .insert([{
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        category_id: newProduct.category_id
      }])
      .select();
    if (!error && data) {
      setProducts(prev => [...prev, data[0]]);
      setNewProduct({ name: "", price: "", category_id: "" });
    }
  }

  function openProductModal(product) {
    setModalProduct({ ...product });
    setModalProdOpen(true);
  }

  async function handleSaveProduct() {
    if (!modalProduct.name || !modalProduct.price || !modalProduct.category_id) return;
    const { data, error } = await supabase
      .from("products")
      .update({
        name: modalProduct.name,
        price: parseFloat(modalProduct.price),
        category_id: modalProduct.category_id
      })
      .eq("id", modalProduct.id)
      .select();
    if (!error && data) {
      setProducts(prev =>
        prev.map(p => (p.id === modalProduct.id ? data[0] : p))
      );
      setModalProdOpen(false);
    }
  }

  function openDeleteProduct(product) {
    setProductToDelete(product);
    setDeleteProdOpen(true);
  }

  async function handleDeleteProduct() {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productToDelete.id);
    if (!error) {
      setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
      setDeleteProdOpen(false);
      setProductToDelete(null);
    }
  }

  // ======== VIEWS ========
  if (view === "menu") {
    return (
      <div className="FormAll welcome-box">
        <h1>Bem-vindo!</h1>
        <div className="buttons">
          <button className="send" onClick={() => setView("categories")}>Categorias</button>
          <button className="send" onClick={() => setView("products")}>Produtos</button>
        </div>
      </div>
    );
  }

  // === CATEGORIES ===
  if (view === "categories") {
    return (
      <div className="FormAll">

        <form onSubmit={handleAddCategory} className="form-box animate-form">
          <input
            type="text"
            placeholder="Nome da Categoria"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
          />
          <button type="submit" className="send">Adicionar Categoria</button>
        </form>

        <div className="form-box animate-form table-box">
          <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Criado em</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(c => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{new Date(c.created_at).toLocaleString()}</td>
                  <td className="actions">
                    <button className="edit" onClick={() => openCategoryModal(c)}>Editar</button>
                    <button className="delete" onClick={() => openDeleteCategory(c)}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="btn-back" onClick={() => setView("menu")}>Voltar ao Menu</button>

        {/* MODAL EDIT */}
        {modalCatOpen && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h2>Editar Categoria</h2>
              <input
                type="text"
                value={modalCategory.name}
                onChange={e => setModalCategory(prev => ({ ...prev, name: e.target.value }))}
              />
              <div className="buttons">
                <button className="send" onClick={handleSaveCategory}>Salvar</button>
                <button className="btn-back" onClick={() => setModalCatOpen(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL DELETE */}
        {deleteCatOpen && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h2>Tem certeza que deseja deletar?</h2>
              <p>{categoryToDelete?.name}</p>
              <div className="buttons">
                <button className="send" onClick={handleDeleteCategory}>Confirmar</button>
                <button className="btn-back" onClick={() => setDeleteCatOpen(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL ALERT */}
        {alertOpen && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h2>Atenção!</h2>
              <p>{alertMessage}</p>
              <div className="buttons">
                <button className="btn-back" onClick={() => setAlertOpen(false)}>OK</button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // === PRODUCTS ===
  if (view === "products") {
    return (
      <div className="FormAll">

        <form onSubmit={handleAddProduct} className="form-box animate-form">
          <input
            type="text"
            placeholder="Nome do Produto"
            value={newProduct.name}
            onChange={e => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
          />
          <input
            type="number"
            placeholder="Preço"
            value={newProduct.price}
            onChange={e => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
          />
          <select
            value={newProduct.category_id}
            onChange={e => setNewProduct(prev => ({ ...prev, category_id: e.target.value }))}
          >
            <option value="">Selecione a Categoria</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button type="submit" className="send">Adicionar Produto</button>
        </form>

        <div className="form-box animate-form table-box">
          <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Criado em</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.price.toFixed(2)}</td>
                  <td>{categories.find(c => c.id === p.category_id)?.name || ""}</td>
                  <td>{new Date(p.created_at).toLocaleString()}</td>
                  <td className="actions">
                    <button className="edit" onClick={() => openProductModal(p)}>Editar</button>
                    <button className="delete" onClick={() => openDeleteProduct(p)}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="btn-back" onClick={() => setView("menu")}>Voltar ao Menu</button>

        {/* MODAL EDIT PRODUCT */}
        {modalProdOpen && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h2>Editar Produto</h2>
              <input
                type="text"
                value={modalProduct.name}
                onChange={e => setModalProduct(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nome do Produto"
              />
              <input
                type="number"
                value={modalProduct.price}
                onChange={e => setModalProduct(prev => ({ ...prev, price: e.target.value }))}
                placeholder="Preço"
              />
              <select
                value={modalProduct.category_id}
                onChange={e => setModalProduct(prev => ({ ...prev, category_id: e.target.value }))}
              >
                <option value="">Selecione a Categoria</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <div className="buttons">
                <button className="send" onClick={handleSaveProduct}>Salvar</button>
                <button className="btn-back" onClick={() => setModalProdOpen(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL DELETE PRODUCT */}
        {deleteProdOpen && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h2>Tem certeza que deseja deletar?</h2>
              <p>{productToDelete?.name}</p>
              <div className="buttons">
                <button className="send" onClick={handleDeleteProduct}>Confirmar</button>
                <button className="btn-back" onClick={() => setDeleteProdOpen(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL ALERT */}
        {alertOpen && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h2>Atenção!</h2>
              <p>{alertMessage}</p>
              <div className="buttons">
                <button className="btn-back" onClick={() => setAlertOpen(false)}>OK</button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }
};

export default App;
