import { useState, useEffect } from "react";
import React from "react";
import { supabase } from "./CreateClient.js";
import "./App.css";

const App = () => {
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState({ name: "" });

  // Modal edição
  const [editingClient, setEditingClient] = useState(null);
  const [editName, setEditName] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Erro ao buscar clientes:", error);
      return;
    }
    setClients(data);
  }

  function handleChange(evt) {
    setClient(prev => ({ ...prev, [evt.target.name]: evt.target.value }));
  }

  async function createClient(evt) {
    evt.preventDefault();
    if (!client.name) return;

    const { data, error } = await supabase
      .from("clients")
      .insert([{ name: client.name }])
      .select();

    if (error) {
      console.error("Erro ao criar cliente:", error);
      return;
    }

    setClients(prev => [...prev, data[0]]);
    setClient({ name: "" });
  }

  async function deleteClient(id) {
    const { error } = await supabase
      .from("clients")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Erro ao deletar:", error);
      return;
    }

    setClients(prev => prev.filter(c => c.id !== id));
  }

  function openEditModal(client) {
    setEditingClient(client);
    setEditName(client.name);
    setShowEditModal(true);
  }

  async function saveEdit() {
    if (!editName) return;

    const { data, error } = await supabase
      .from("clients")
      .update({ name: editName })
      .eq("id", editingClient.id)
      .select();

    if (error) {
      console.error("Erro ao atualizar cliente:", error);
      return;
    }

    setClients(prev =>
      prev.map(c => (c.id === editingClient.id ? data[0] : c))
    );

    setShowEditModal(false);
    setEditingClient(null);
    setEditName("");
  }

  return (
    <div className="container">
      {/* Form criar cliente */}
      <form onSubmit={createClient} className="form">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={client.name}
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="button">Enviar</button>
      </form>

      {/* Tabela de clientes */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>CREATED_AT</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{new Date(c.created_at).toLocaleString()}</td>
              <td>
                <button
                  onClick={() => openEditModal(c)}
                  className="button edit-button"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteClient(c.id)}
                  className="button delete-button"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de edição */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Editar Cliente</h3>
            <input
              type="text"
              value={editName}
              onChange={e => setEditName(e.target.value)}
              className="input"
            />
            <div className="modal-buttons">
              <button onClick={saveEdit} className="button">Salvar</button>
              <button
                onClick={() => setShowEditModal(false)}
                className="button cancel"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
